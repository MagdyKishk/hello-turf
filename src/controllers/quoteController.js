/**
 * Quote Controller
 * Handles quote form submissions
 */

const { body, validationResult } = require('express-validator');
const { sendEmail } = require('../config/email');
// Uncomment when using MongoDB
// const Quote = require('../models/Quote');

// Validation rules
exports.quoteValidation = [
    body('fullName')
        .trim()
        .notEmpty()
        .withMessage('Full name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),
    body('email')
        .optional({ checkFalsy: true })
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    body('phone')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required')
        .matches(/^[\d\s\-\(\)]+$/)
        .withMessage('Please provide a valid phone number'),
    body('address')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage('Address must be less than 200 characters'),
    body('projectSize')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Project size must be less than 50 characters'),
    body('message')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Message must be less than 1000 characters')
];

// Handle quote submission
exports.submitQuote = async (req, res) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { fullName, email, phone, address, projectSize, message } = req.body;

        // Create quote data object
        const quoteData = {
            fullName,
            email: email || 'Not provided',
            phone,
            address: address || 'Not provided',
            projectSize: projectSize || 'Not specified',
            message: message || 'No additional message',
            submittedAt: new Date(),
            ipAddress: req.ip || req.connection.remoteAddress,
            userAgent: req.headers['user-agent']
        };

        // Save to database (uncomment when using MongoDB)
        /*
        const newQuote = new Quote(quoteData);
        await newQuote.save();
        */

        // For now, just log it
        console.log('📝 New Quote Received:', quoteData);

        // Send email notification
        const emailHtml = `
            <h2>New Quote Request from Hello Turf Website</h2>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            <hr>
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Address:</strong> ${address || 'Not provided'}</p>
            <p><strong>Project Size:</strong> ${projectSize || 'Not specified'}</p>
            <hr>
            <h3>Message</h3>
            <p>${message || 'No additional message'}</p>
            <hr>
            <p><small>IP Address: ${quoteData.ipAddress}</small></p>
        `;

        const emailText = `
New Quote Request from Hello Turf Website

Submitted: ${new Date().toLocaleString()}

Customer Information:
Name: ${fullName}
Phone: ${phone}
Email: ${email || 'Not provided'}
Address: ${address || 'Not provided'}
Project Size: ${projectSize || 'Not specified'}

Message:
${message || 'No additional message'}

IP Address: ${quoteData.ipAddress}
        `;

        // Send email (will only work if email is configured in .env)
        try {
            await sendEmail({
                to: process.env.EMAIL_TO,
                subject: `New Quote Request - ${fullName}`,
                html: emailHtml,
                text: emailText
            });
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Continue even if email fails
        }

        // Send success response
        res.json({
            success: true,
            message: 'Thank you for your quote request! We\'ll contact you within 24 hours.'
        });

    } catch (error) {
        console.error('Error submitting quote:', error);
        res.status(500).json({
            success: false,
            message: 'Sorry, something went wrong. Please call us directly at (512) 317-5400.'
        });
    }
};

// Get quote form page
exports.getQuoteForm = (req, res) => {
    try {
        res.render('contact', {
            title: 'Get a Free Quote | Hello Turf',
            currentPage: 'contact'
        });
    } catch (error) {
        console.error('Error rendering quote form:', error);
        res.status(500).render('error', {
            title: 'Error',
            error: error,
            message: 'Error loading quote form'
        });
    }
};

