const mongoose = require('mongoose');

const CapsuleSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: [true, 'Capsule must have an owner.'],
            capsuleindex: true
        },
        type: {
            type: String,
            enum: {
                values: ['goal', 'journal'],
                message: 'Capsule type must be either "goal" or "journal".'
            },
            required: [true, 'Capsule type is required.'],
            trim: true,
        },
        title: {
            type: String,
            required: [true, 'Capsule title is required.'],
            trim: true,
            minlength: [3, 'Title must be at least 3 characters long.'],
            maxlength: [100, 'Title cannot exceed 100 characters.']
        },
        content: {
            type: String,
            required: [true, 'Capsule content is required.']
        },
        isPrivate: {
            type: Boolean,
            default: false
        },
        
        revealDate: {
            type: Date,
            validate: {
                validator: function(v) {
                    return !v || this.viewMode !== 'timed' || v > Date.now();
                },
                message: 'Reveal date must be in the future when viewMode is "timed".'
            }
        },
        viewMode: {
            type: String,
            enum: {
                values: ['anytime', 'timed'],
                message: 'View mode must be either "anytime" or "timed".'
            },
            default: 'anytime',
            trim: true,
            lowercase: true
        },
        attachments: [{
            url: {
                type: String,
                required: [true, 'Attachment URL is required.'],
                trim: true
                // Add URL format validation if desired
            },
            type: {
                type: String,
                enum: {
                    values: ['image', 'audio', 'video', 'document'], // Added 'document' as a common type
                    message: 'Attachment type must be "image", "audio", "video", or "document".'
                },
                required: [true, 'Attachment type is required.'],
                trim: true,
                lowercase: true
            },
            originalName: {
                type: String,
                required: [true, 'Original attachment name is required.'],
                trim: true,
                maxlength: [255, 'Original file name cannot exceed 255 characters.']
            },
            size: { // Useful for displaying file size
                type: Number,
                min: [0, 'Attachment size cannot be negative.']
            },
            mimeType: { // Useful for identifying file type without relying solely on extension
                type: String,
                trim: true
            }
        }],
    },
    {
        timestamps: true,
        collection: 'capsules',

        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

module.exports = mongoose.model('Capsule', CapsuleSchema);