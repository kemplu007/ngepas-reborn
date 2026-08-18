/*==================================================
 NGEPAS REBORN
 File   : security.js
 Module : HTTP Security Configuration
 Scope  : PR-F minimal hardening; no auth/data logic
==================================================*/

const rateLimit = require("express-rate-limit");

const DEFAULT_ALLOWED_ORIGINS = [
  "https://ngepas-reborn.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

function parseAllowedOrigins(value) {
  if (!value) return [];

  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function readPositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

const allowedOrigins = new Set([
  ...DEFAULT_ALLOWED_ORIGINS,
  ...parseAllowedOrigins(process.env.CORS_ALLOWED_ORIGINS),
]);

function isAllowedOrigin(origin) {
  return !origin || allowedOrigins.has(origin);
}

function createCorsOptions() {
  return {
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      const error = new Error("Origin tidak diizinkan");
      error.status = 403;
      return callback(error);
    },
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  };
}

function createApiRateLimiter() {
  const windowMs = readPositiveInteger(
    process.env.API_RATE_LIMIT_WINDOW_MS,
    15 * 60 * 1000,
  );
  const limit = readPositiveInteger(process.env.API_RATE_LIMIT_MAX, 120);

  return rateLimit({
    windowMs,
    limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    skip: (request) => request.method === "OPTIONS",
    handler: (request, response) => {
      response.status(429).json({
        success: false,
        message: "Terlalu banyak permintaan. Coba lagi nanti.",
      });
    },
  });
}

module.exports = {
  createApiRateLimiter,
  createCorsOptions,
  isAllowedOrigin,
  parseAllowedOrigins,
  readPositiveInteger,
};
