const fs = require("fs");
const path = require('path');

// Check if './log.log' exists, if not create file.
const logFilePath = path.join(__dirname, './log.log');
if (!fs.existsSync(logFilePath)) {
  fs.writeFileSync(logFilePath, '', 'utf-8');
}

/**
 * Logs a message with the specified level.
 * @param {string} level - The log level (info, debug, error, warning).
 * @param {string} message - The message to be logged.
 * @returns {Promise<void>} - A promise that resolves when the message is logged.
 */
async function logMessage(level, message) {
    const logMessage = `${new Date().toLocaleString('en-GB', { timeZone: 'UTC' }).replace(',', '')} [${level.toUpperCase()}] ${message}`;
    console.log(logMessage)
     
    fs.appendFile(logFilePath, logMessage + '\n', (appendErr) => {
        if (appendErr) console.error("An error occurred while appending to the log file (./api/logs/log.json):", appendErr);
    }
)};

module.exports = logMessage;