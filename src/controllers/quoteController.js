/**
 * Quote Controller
 * Handles quote form submissions
 */

const { body, validationResult } = require('express-validator');
const { sendEmail } = require('../config/email');
const geoip = require('geoip-lite');
const UAParser = require('ua-parser-js');
const axios = require('axios');
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

        // Get detailed IP and browser information
        let ipAddress = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.ip || req.connection.remoteAddress || 'Unknown';
        
        // Clean up IP address (remove ::ffff: prefix from IPv4-mapped IPv6)
        if (ipAddress.includes('::ffff:')) {
            ipAddress = ipAddress.split('::ffff:')[1];
        }
        
        // Remove port number if present
        if (ipAddress.includes(':')) {
            const parts = ipAddress.split(':');
            if (parts.length === 2 && !isNaN(parts[1])) {
                ipAddress = parts[0];
            }
        }
        
        const userAgent = req.headers['user-agent'] || 'Unknown';
        const referrer = req.headers['referer'] || req.headers['referrer'] || 'Direct visit';
        const acceptLanguage = req.headers['accept-language'] || 'Unknown';
        
        // Parse user agent for detailed browser info
        const parser = new UAParser(userAgent);
        const browserInfo = parser.getResult();
        
        // Get geolocation from IP
        let geo = geoip.lookup(ipAddress);
        
        // If local IP or geoip failed, try external API
        if (!geo && ipAddress !== 'Unknown' && !ipAddress.startsWith('127.') && ipAddress !== '::1') {
            try {
                const geoResponse = await axios.get(`http://ip-api.com/json/${ipAddress}`, {
                    timeout: 3000
                });
                
                if (geoResponse.data && geoResponse.data.status === 'success') {
                    geo = {
                        country: geoResponse.data.countryCode,
                        region: geoResponse.data.region,
                        city: geoResponse.data.city,
                        ll: [geoResponse.data.lat, geoResponse.data.lon],
                        timezone: geoResponse.data.timezone,
                        isp: geoResponse.data.isp,
                        org: geoResponse.data.org,
                        as: geoResponse.data.as
                    };
                }
            } catch (geoError) {
                console.log('⚠️  Geolocation API error:', geoError.message);
            }
        }

        // Create quote data object
        const quoteData = {
            fullName,
            email: email || 'Not provided',
            phone,
            address: address || 'Not provided',
            projectSize: projectSize || 'Not specified',
            message: message || 'No additional message',
            submittedAt: new Date(),
            ipAddress: ipAddress,
            userAgent: userAgent,
            browserInfo: browserInfo,
            geo: geo,
            referrer: referrer,
            language: acceptLanguage
        };

        // Save to database (uncomment when using MongoDB)
        /*
        const newQuote = new Quote(quoteData);
        await newQuote.save();
        */

        // For now, just log it
        console.log('📝 New Quote Received:', {
            customer: fullName,
            phone: phone,
            email: email || 'Not provided',
            ip: ipAddress,
            location: geo ? `${geo.city}, ${geo.region}, ${geo.country}` : 'Localhost'
        });

        // Send notification email to business
        const businessEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You - Hello Turf</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color: #F8F9FA; line-height: 1.6;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8F9FA; padding: 30px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 600px; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #1A1A2E; padding: 40px 30px; text-align: center;">
                            <img src="https://hello-turf.com/images/logo/hello-turf-light.png" alt="Hello Turf Logo" style="max-width: 200px; height: auto; margin-bottom: 20px;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; font-family: 'Poppins', sans-serif;">New Quote Request</h1>
                            <p style="color: rgba(255, 255, 255, 0.8); margin: 10px 0 0 0; font-size: 14px;">You have a new customer inquiry</p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            
                            <!-- Customer Information -->
                            <h2 style="color: #1A1A2E; font-size: 18px; font-weight: 700; margin: 0 0 20px 0; font-family: 'Poppins', sans-serif; border-bottom: 2px solid #E9ECEF; padding-bottom: 12px;">Customer Details</h2>
                            
                            <!-- Info Table -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #E9ECEF; border-radius: 8px; overflow: hidden; margin-bottom: 30px;">
                                <tr style="background-color: #F8F9FA;">
                                    <td style="padding: 15px 20px; width: 35%; border-bottom: 1px solid #E9ECEF; border-right: 1px solid #E9ECEF;">
                                        <p style="margin: 0; color: #6C757D; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</p>
                                    </td>
                                    <td style="padding: 15px 20px; border-bottom: 1px solid #E9ECEF;">
                                        <p style="margin: 0; color: #1A1A2E; font-size: 15px; font-weight: 600;">${fullName}</p>
                                    </td>
                                </tr>
                                <tr style="background-color: #ffffff;">
                                    <td style="padding: 15px 20px; border-bottom: 1px solid #E9ECEF; border-right: 1px solid #E9ECEF;">
                                        <p style="margin: 0; color: #6C757D; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Phone Number</p>
                                    </td>
                                    <td style="padding: 15px 20px; border-bottom: 1px solid #E9ECEF;">
                                        <p style="margin: 0; color: #0066CC; font-size: 15px; font-weight: 600;">
                                            <a href="tel:${phone}" style="color: #0066CC; text-decoration: none;">${phone}</a>
                                        </p>
                                    </td>
                                </tr>
                                <tr style="background-color: #F8F9FA;">
                                    <td style="padding: 15px 20px; border-bottom: 1px solid #E9ECEF; border-right: 1px solid #E9ECEF;">
                                        <p style="margin: 0; color: #6C757D; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</p>
                                    </td>
                                    <td style="padding: 15px 20px; border-bottom: 1px solid #E9ECEF;">
                                        <p style="margin: 0; color: #0066CC; font-size: 15px;">
                                            ${email ? `<a href="mailto:${email}" style="color: #0066CC; text-decoration: none;">${email}</a>` : '<span style="color: #6C757D; font-style: italic;">Not provided</span>'}
                                        </p>
                                    </td>
                                </tr>
                                <tr style="background-color: #ffffff;">
                                    <td style="padding: 15px 20px; border-bottom: 1px solid #E9ECEF; border-right: 1px solid #E9ECEF;">
                                        <p style="margin: 0; color: #6C757D; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Address</p>
                                    </td>
                                    <td style="padding: 15px 20px; border-bottom: 1px solid #E9ECEF;">
                                        <p style="margin: 0; color: #1A1A2E; font-size: 15px;">
                                            ${address || '<span style="color: #6C757D; font-style: italic;">Not provided</span>'}
                                        </p>
                                    </td>
                                </tr>
                                <tr style="background-color: #F8F9FA;">
                                    <td style="padding: 15px 20px; border-right: 1px solid #E9ECEF;">
                                        <p style="margin: 0; color: #6C757D; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Project Size</p>
                                    </td>
                                    <td style="padding: 15px 20px;">
                                        <p style="margin: 0; color: #1A1A2E; font-size: 15px;">
                                            ${projectSize || '<span style="color: #6C757D; font-style: italic;">Not specified</span>'}
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Message Section -->
                            <h2 style="color: #1A1A2E; font-size: 18px; font-weight: 700; margin: 30px 0 20px 0; font-family: 'Poppins', sans-serif; border-bottom: 2px solid #E9ECEF; padding-bottom: 12px;">Customer Message</h2>
                            
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td style="background-color: #F8F9FA; padding: 20px; border-radius: 8px;">
                                        <p style="margin: 0; color: #2C3E50; font-size: 15px; line-height: 1.7;">
                                            ${message || '<span style="color: #6C757D; font-style: italic;">No additional message provided</span>'}
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- CTA Button -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 35px 0 25px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="tel:${phone}" style="display: inline-block; background: linear-gradient(135deg, #2ECC71 0%, #27AE60 100%); color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 50px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(46, 204, 113, 0.4);">Call Customer</a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Subtle submission info -->
                            <p style="margin: 20px 0 0 0; padding-top: 15px; border-top: 1px solid #E9ECEF; color: #999; font-size: 11px; text-align: center;">
                                Submitted from: ${quoteData.ipAddress}${geo ? ` • ${geo.city || ''} ${geo.region ? ', ' + geo.region : ''} ${geo.country ? ', ' + geo.country : ''}` : ''} • ${new Date().toLocaleString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric', 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                })}
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #1A1A2E; padding: 30px; text-align: center;">
                            <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 18px; font-weight: 700; font-family: 'Poppins', sans-serif;">
                                <span style="color: #0978b9;">hello</span> TURF
                            </p>
                            <p style="margin: 0 0 15px 0; color: rgba(255, 255, 255, 0.8); font-size: 14px;">Austin's Artificial Turf Specialists</p>
                            <p style="margin: 5px 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">(512) 317-5400</p>
                            <p style="margin: 5px 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">hello@hello-turf.com</p>
                            <p style="margin: 20px 0 0 0; color: rgba(255, 255, 255, 0.5); font-size: 11px;">
                                © ${new Date().getFullYear()} Hello Turf. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
                `;

        // Customer confirmation email template
        const customerConfirmationHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You - Hello Turf</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color: #F8F9FA; line-height: 1.6;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8F9FA; padding: 30px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 600px; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #1A1A2E; padding: 40px 30px; text-align: center;">
                            <img src="https://hello-turf.com/images/logo/hello-turf-light.png" alt="Hello Turf Logo" style="max-width: 200px; height: auto; margin-bottom: 20px;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; font-family: 'Poppins', sans-serif;">Thank You!</h1>
                            <p style="color: rgba(255, 255, 255, 0.8); margin: 10px 0 0 0; font-size: 14px;">We received your quote request</p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            
                            <p style="margin: 0 0 20px 0; color: #2C3E50; font-size: 16px; line-height: 1.7;">
                                Hi <strong>${fullName}</strong>,
                            </p>
                            
                            <p style="margin: 0 0 20px 0; color: #2C3E50; font-size: 15px; line-height: 1.7;">
                                Thank you for contacting <span style="color: #0978b9;">hello</span> <strong>TURF</strong>! We've received your quote request and will respond to you as soon as possible.
                            </p>

                            <p style="margin: 0 0 25px 0; color: #2C3E50; font-size: 15px; line-height: 1.7;">
                                One of our turf specialists will review your information and contact you within 24 hours to discuss your project and provide a free, no-obligation quote.
                            </p>

                            <!-- What Happens Next -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #0066CC 0%, #2ECC71 100%); border-radius: 10px; padding: 25px; margin: 25px 0;">
                                <tr>
                                    <td>
                                        <h3 style="margin: 0 0 15px 0; color: #ffffff; font-size: 18px; font-weight: 700; font-family: 'Poppins', sans-serif;">What Happens Next?</h3>
                                        <ul style="margin: 0; padding-left: 20px; color: #ffffff; font-size: 14px; line-height: 1.8;">
                                            <li>We'll review your project details</li>
                                            <li>A specialist will call you to discuss your needs</li>
                                            <li>You'll receive a detailed, free quote</li>
                                            <li>We can schedule a site visit if needed</li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>

                            <!-- Contact Info Box -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8F9FA; border-radius: 10px; padding: 20px; margin: 25px 0;">
                                <tr>
                                    <td>
                                        <h3 style="margin: 0 0 15px 0; color: #1A1A2E; font-size: 16px; font-weight: 700; font-family: 'Poppins', sans-serif;">Need Immediate Assistance?</h3>
                                        <p style="margin: 0 0 10px 0; color: #2C3E50; font-size: 14px;">
                                            <strong>Call us:</strong> <a href="tel:+15123175400" style="color: #0066CC; text-decoration: none;">(512) 317-5400</a>
                                        </p>
                                        <p style="margin: 0; color: #2C3E50; font-size: 14px;">
                                            <strong>Email:</strong> <a href="mailto:hello@hello-turf.com" style="color: #0066CC; text-decoration: none;">hello@hello-turf.com</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Subtle submission info -->
                            <p style="margin: 20px 0 0 0; padding-top: 15px; border-top: 1px solid #E9ECEF; color: #999; font-size: 11px; text-align: center;">
                                Submitted from: ${quoteData.ipAddress}${geo ? ` • ${geo.city || ''} ${geo.region ? ', ' + geo.region : ''} ${geo.country ? ', ' + geo.country : ''}` : ''} • ${new Date().toLocaleString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric', 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                })}
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #1A1A2E; padding: 30px; text-align: center;">
                            <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 18px; font-weight: 700; font-family: 'Poppins', sans-serif;">
                                <span style="color: #0978b9;">hello</span> TURF
                            </p>
                            <p style="margin: 0 0 15px 0; color: rgba(255, 255, 255, 0.8); font-size: 14px;">Austin's Artificial Turf Specialists</p>
                            <p style="margin: 5px 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">(512) 317-5400</p>
                            <p style="margin: 5px 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">hello@hello-turf.com</p>
                            <p style="margin: 20px 0 0 0; color: rgba(255, 255, 255, 0.5); font-size: 11px;">
                                © ${new Date().getFullYear()} Hello Turf. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `;

        // Send business notification to EMAIL_TO (hello@hello-turf.com)
        try {
            await sendEmail({
                to: process.env.EMAIL_TO,
                subject: `New Quote Request - ${fullName}`,
                html: businessEmailHtml,
                text: `New Quote Request\n\nCustomer: ${fullName}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nAddress: ${address || 'Not provided'}\nProject Size: ${projectSize || 'Not specified'}\n\nMessage: ${message || 'No additional message'}\n\nSubmitted from: ${quoteData.ipAddress}${geo ? ` • ${geo.city}, ${geo.region}, ${geo.country}` : ''}`,
                priority: 'high',
                headers: {
                    'X-Priority': '1',
                    'X-MSMail-Priority': 'High',
                    'Importance': 'high'
                }
            });
            console.log(`✅ Business notification sent to: ${process.env.EMAIL_TO}`);
        } catch (emailError) {
            console.error('Business email failed:', emailError);
        }

        // Send confirmation email to customer (if email provided)
        if (email) {
            try {
                await sendEmail({
                    to: email,
                    subject: 'Thank You for Your Quote Request - Hello Turf',
                    html: customerConfirmationHtml,
                    text: `Thank you for contacting Hello Turf!\n\nWe've received your quote request and will respond to you as soon as possible.\n\nYour Details:\nName: ${fullName}\nPhone: ${phone}\nEmail: ${email}\n\nWe'll contact you within 24 hours.\n\nHello Turf\n(512) 317-5400\nhello@hello-turf.com`
                });
                console.log(`✅ Customer confirmation sent to: ${email}`);
            } catch (confirmError) {
                console.error('Customer confirmation email failed:', confirmError);
            }
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

