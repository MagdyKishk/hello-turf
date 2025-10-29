/**
 * Quote Model
 * Schema for quote requests from customers
 */

const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please provide your full name'],
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone number'],
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    projectSize: {
        type: String,
        trim: true
    },
    service: {
        type: String,
        enum: [
            'residential',
            'commercial',
            'putting-greens',
            'pet-turf',
            'pool-turf',
            'sports-turf',
            'pavers',
            'other'
        ]
    },
    message: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'quoted', 'won', 'lost'],
        default: 'new'
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    ipAddress: {
        type: String
    },
    userAgent: {
        type: String
    }
}, {
    timestamps: true
});

// Index for faster queries
quoteSchema.index({ status: 1, submittedAt: -1 });
quoteSchema.index({ phone: 1 });
quoteSchema.index({ email: 1 });

// Virtual for formatted submission date
quoteSchema.virtual('formattedDate').get(function() {
    return this.submittedAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

module.exports = mongoose.model('Quote', quoteSchema);

