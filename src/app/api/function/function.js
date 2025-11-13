const jwt = require('jsonwebtoken');
const axios = require('axios');
var CryptoJS = require("crypto-js");

export const validateMissingFields = (fields) => {
    const missingFields = [];

    for (const field in fields) {
        if (!fields[field]) {
            missingFields.push(field);
        }
    }

    return missingFields.length === 0 ? null : missingFields;
};

export const isValidEmail = (email) => {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidMobileNumber = (mobileNumber) => {
    // Basic validation for an Indian mobile number (10 digits starting with 6, 7, 8, or 9)
    const mobileNumberRegex = /^[6-9]\d{9}$/;
    return mobileNumberRegex.test(mobileNumber);
};

export const isValidPincode = (pincode) => {
    // Basic validation for an Indian PIN code (6 digits)
    const pincodeRegex = /^\d{6}$/;
    return pincodeRegex.test(pincode);
};

export const generateUsername = (firstName) => {
    // Remove spaces and convert to lowercase
    const cleanFirstName = firstName.replace(/\s/g, '').toLowerCase();

    // Generate a random number between 1000 and 9999
    const randomDigits = Math.floor(1000 + Math.random() * 9000);

    // Combine the cleaned first name with the random number
    const username = `${cleanFirstName}${randomDigits}`;

    return username;
};

export const generateRandomId = (firstStr, lastStr) => {
    // Remove spaces and convert to lowercase
    const cleanFirstName = firstStr.replace(/\s/g, '').toUpperCase();
    const cleanlastStr = lastStr.replace(/\s/g, '').toUpperCase();

    // Generate a random number between 1000 and 9999
    const randomDigits = Math.floor(1000 + Math.random() * 9000);

    // Combine the cleaned first name with the random number
    const randomId = `${cleanFirstName}${randomDigits}${cleanlastStr}`;

    return randomId;
};

export const generatePassword = async (password) => {
    // Hash the password using AES encryption with a secret key
    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.JWTKEY).toString();
    return encryptedPassword;
};

export const verifyPassword = async (password, hashedPassword) => {
    // Decrypt the stored hashed password
    const bytes = CryptoJS.AES.decrypt(hashedPassword, process.env.JWTKEY);
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

    // Compare the decrypted password with the input password
    return decryptedPassword === password;
};

// Function to generate JWT token
export const generateJwtToken = (payload) => {
    const jwtOptions = {
        expiresIn: '1h', // You can adjust the expiration time as needed
    };
    return jwt.sign(payload, process.env.JWTKEY, jwtOptions);
};

export const decodeJwtToken = (payload) => {
    return jwt.verify(payload, process.env.JWTKEY);
};

export const getIpAddress = (req) => {

    const realIp = req.headers['x-real-ip'];

    if (realIp) {
        return realIp;
    }

    // Check if 'x-forwarded-for' header is present (commonly used by proxies/load balancers)
    const forwardedFor = req.headers['x-forwarded-for'];

    if (forwardedFor) {
        // The 'x-forwarded-for' header can contain a comma-separated list of IP addresses
        // Use the first IP in the list (client's IP)
        return forwardedFor.split(',')[0].trim();
    }

    // Check if 'x-forwarded-for' header is present (commonly used by proxies/load balancers)
    const clientIp = req.clientIp;

    if (clientIp) {
        // The 'x-forwarded-for' header can contain a comma-separated list of IP addresses
        // Use the first IP in the list (client's IP)
        return clientIp || "";
    }

    // If 'x-forwarded-for' header is not present, use the remote address from the request object
    return req.ip || req.connection.remoteAddress;
};

// Function to get the client's public IP address
export const getPublicIpAddress = async (req) => {
    try {
        const response = await axios.get('https://ipinfo.io', {
            headers: {
                'x-forwarded-for': req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            },
        });

        return response.data.ip;
    } catch (error) {
        console.error('Error fetching public IP:', error.message);
        return '';
    }
};

