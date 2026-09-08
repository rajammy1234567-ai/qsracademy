// Vercel Serverless Function entry point
// Connects Vercel's edge network directly to our Express REST API
const app = require('../server/src/server');

module.exports = app;
