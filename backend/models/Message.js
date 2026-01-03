const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Message type is required'],
        enum: {
            values: ['contact', 'newsletter'],
            message: '{VALUE} is not a valid message type',
        },
    },
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    subject: {
        type: String,
        trim: true,
    },
    message: {
        type: String,
        trim: true,
    },
    isResolved: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
