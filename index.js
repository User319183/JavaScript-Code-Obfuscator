require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const obfuscate = require('./obfuscator.js');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const fetch = require('node-fetch'); // For VSCode
// import('node-fetch').then(({default: fetch})) // Fix for Replit
const cookieParser = require('cookie-parser');

const app = express();
app.set('trust proxy', 1);

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(cookieParser());

// Use morgan for logging
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI);

// Define schema for statistics
const StatisticSchema = new mongoose.Schema({
    user: String,
    filesObfuscated: [String]
});

// Create model from the schema
const Statistic = mongoose.model('Statistic', StatisticSchema);

// Rate limiting and slow down middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per windowMs
    handler: async function (req, res, next) {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        const response = await fetch(`https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_TOKEN}`);
        const data = await response.json();
        // Check if the IP belongs to a hosting provider (possible VPN)
        const isPossibleVPN = data.hosting ? "Possible VPN" : "No indication of VPN";

        // Log rate limit to Discord webhook
        fetch(process.env.DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                embeds: [{
                    title: "Rate Limit Exceeded",
                    description: `Rate limit exceeded for IP: ${ip}`,
                    fields: [
                        {
                            name: "Limit",
                            value: this.max
                        },
                        {
                            name: "Reset Time",
                            value: new Date(Date.now() + this.windowMs).toLocaleString("en-US", { timeZone: "America/New_York" }) // Convert to EST
                        },
                        {
                            name: "Timestamp",
                            value: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }) // Convert to EST
                        },
                        {
                            name: "VPN Check",
                            value: isPossibleVPN
                        }
                    ],
                    color: 15158332
                }]
            })
        });

        res.status(429).send('Rate limit exceeded.');
    }
});

// Define speedLimiter for slow down middleware
const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 50, // allow 50 requests per 15 minutes, then...
    delayMs: (req, res, options, used) => {
        const delayAfter = options.delayAfter;
        const delayMs = options.delayMs;
        return (used - delayAfter) * delayMs;
    }
});

app.use(speedLimiter);
app.use(limiter);

// Middleware for VPN detection, developer check, and IP blacklist check
app.use(async (req, res, next) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const response = await fetch(`https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_TOKEN}`);
    const data = await response.json();
    req.isVPN = data.privacy && data.privacy.vpn;

    const hiddenIPs = process.env.HIDDEN_IPS.split(',');
    if (hiddenIPs.some(hiddenIp => ip.startsWith(hiddenIp))) {
        req.isDeveloper = true;
        ip = 'Developer IP detected';
    }

    const blacklistedIPs = process.env.BLACKLISTED_IPS.split(',');
    if (blacklistedIPs.includes(ip)) {
        res.status(403).send('Your IP address is blacklisted from using this service due to violating the Terms of Service.');
        return;
    }

    next();
});

app.use(speedLimiter);
app.use(limiter);

app.post('/obfuscate', async (req, res) => {
    const { code, settings } = req.body;

    // Check if the code is empty
    if (!code || code.trim() === '') {
        res.status(400).send('The code cannot be empty.');
        return;
    }

    const user = req.headers['user-agent']; // Get the User-Agent header
    const ip = req.isDeveloper ? 'Developer IP detected' : req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Fetch data from ipinfo.io
    const response = await fetch(`https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_TOKEN}`);
    const data = await response.json();
    // Check if the IP belongs to a VPN
    const isVPN = data.privacy && data.privacy.vpn;

    if (isVPN) {
        // If a VPN is detected, don't obfuscate and send a message to the Discord webhook
        fetch(process.env.DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                embeds: [{
                    title: "Failed to Obfuscate",
                    description: `User attempted to obfuscate with a VPN: ${user}`,
                    fields: [
                        {
                            name: "IP Address",
                            value: ip
                        },
                        {
                            name: "Timestamp",
                            value: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }) // Convert to EST
                        }
                    ],
                    color: 15158332 // Red color
                }]
            })
        });

        res.status(403).send('Obfuscation is not allowed when using a VPN.');
        return;
    }

    const obfuscatedCode = obfuscate(code, settings);

    // Log successful obfuscation to Discord webhook
    fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            embeds: [{
                title: "Successful Obfuscation",
                description: `Successful obfuscation for user: ${user}`,
                fields: [
                    {
                        name: "Obfuscation Settings",
                        value: JSON.stringify(settings, null, 2)
                    },
                    {
                        name: "Timestamp",
                        value: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }) // Convert to EST
                    },
                    {
                        name: "IP Address",
                        value: ip
                    }
                ],
                color: 3066993 // Green
            }]
        })
    });

    // Find or create statistic for user
    let statistic = await Statistic.findOne({ user: req.headers['user-agent'] });
    if (!statistic) {
        statistic = new Statistic({
            user: req.headers['user-agent'],
            filesObfuscated: []
        });
    }


    // Update statistics
    statistic.filesObfuscated.push(obfuscatedCode);

    await statistic.save(); // Save the statistic to the database

    res.send(obfuscatedCode);
});

app.get('/statistics', async (req, res) => {
    const stats = await Statistic.find();

    // Send statistics
    res.json({
        totalUsersServed: stats.length,
        totalFilesObfuscated: stats.reduce((total, stat) => total + stat.filesObfuscated.length, 0)
    });
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));