const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwt_key = process.env.JWT_KEY;



const registerNewUser = (async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields (name, email, password) are required.',username,email,password });
        }

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'user already exists.' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new user({
            email: email,
            passwordHash: passwordHash,
            username: username

        })

        await newUser.save();

        return res.status(201).json({ message: 'Registration successful. ' });

    } catch (err) {
        console.error(`Error registering the user:\n${err}`);
        return res.status(500).json({ error: 'Server Error' });
    }
}
);


const loginUser = (async (req, res) => {

    try {
        const { email, password } = req.body;
        const TheUser = await user.findOne({ email });

        if (!TheUser) return res.status(404).json({ error: 'User does not exist.' })

        const isValid = await bcrypt.compare(password, TheUser.passwordHash);
        if (!isValid) return res.status(401).json({ error: 'Invalid password!!! Try again.' });
        const token = jwt.sign({ userId: TheUser._id, email: TheUser.email },
            jwt_key,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            token,
            userId: TheUser._id,
            name: TheUser.name,
            email: TheUser.email
        });
    } catch (err) {
        console.error(`Error has occured while loggin in.\n${err}`);
        return res.status(500).json({ error: 'Server Error' });
    }

}
);

module.exports = { registerNewUser, loginUser };