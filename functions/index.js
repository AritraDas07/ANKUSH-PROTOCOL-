const { onRequest } = require("firebase-functions/v2/https");
const { app } = require("./server");

// Expose the Express App as a Cloud Function called "api"
exports.api = onRequest(app);
