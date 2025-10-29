/**
 * Hello Turf - Main Server File
 * Full-stack MVC Node.js Application
 */

// Load environment variables
require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');

// Import routes
const indexRoutes = require('./src/routes/indexRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');
const quoteRoutes = require('./src/routes/quoteRoutes');

// Import database connection (optional - comment out if not using MongoDB)
// const connectDB = require('./src/config/database');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database (optional - uncomment when ready to use MongoDB)
// connectDB();

// ========================================
// Middleware Configuration
// ========================================

// Security middleware - Relaxed for CSS/JS to work properly
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP temporarily to test
    crossOriginEmbedderPolicy: false
}));

// Compression middleware
app.use(compression());

// CORS middleware
app.use(cors());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'hello-turf-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Static files with proper MIME types
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        } else if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Debug middleware - log all requests (remove in production)
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
    });
}

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// ========================================
// Routes
// ========================================

app.use('/', indexRoutes);
app.use('/services', serviceRoutes);
app.use('/quote', quoteRoutes);

// ========================================
// Error Handling
// ========================================

// 404 handler
app.use((req, res, next) => {
    res.status(404).render('404', {
        title: '404 - Page Not Found',
        path: req.path
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    res.status(err.status || 500).render('error', {
        title: 'Error',
        error: process.env.NODE_ENV === 'development' ? err : {},
        message: err.message || 'Something went wrong!'
    });
});

// ========================================
// Start Server
// ========================================

app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════╗
║                                       ║
║       🌱 Hello Turf Server 🌱        ║
║                                       ║
║   Server running on port ${PORT}       ║
║   Environment: ${process.env.NODE_ENV || 'development'}            ║
║   URL: http://localhost:${PORT}          ║
║                                       ║
╚═══════════════════════════════════════╝
    `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    // Close server & exit process
    process.exit(1);
});

module.exports = app;

