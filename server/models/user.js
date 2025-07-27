const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required.'],
            unique: true,
            trim: true,
            minlength: [3, 'Username must be at least 3 characters long.'],
            maxlength: [30, 'Username cannot exceed 30 characters.']
        },
        passwordHash: {
            type: String,
            required: [true, 'Password is required.'],
            minlength: [40, 'Password hash must be at least 60 characters long.']
        },
        email: {
            type: String,
            required: [true, 'Email is required.'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email address.']
        },
        // Optional fields that are often useful:
        firstName: {
            type: String,
            trim: true,
            maxlength: 40
        },
        lastName: {
            type: String,
            trim: true,
            maxlength: 40
        },
        lastLogin: {
            type: Date // To track last login time
        }
    },
    {
        timestamps: true,
        collection: 'users'
    }
);


module.exports = mongoose.model('User', userSchema);