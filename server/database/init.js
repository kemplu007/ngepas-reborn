/*==================================================
 NGEPAS REBORN
 File   : init.js
 Module : Database Initializer
==================================================*/

const db = require("./db");

/*==================================================
 PRODUCTS TABLE
==================================================*/

db.exec(`
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,
    room TEXT NOT NULL,
    category TEXT NOT NULL,
    slug TEXT UNIQUE,

    price INTEGER NOT NULL,
    originalPrice INTEGER,
    discount INTEGER DEFAULT 0,

    image TEXT NOT NULL,

    badge TEXT,
    reason TEXT,

    rating REAL DEFAULT 0,
    sold INTEGER DEFAULT 0,

    featured INTEGER DEFAULT 0,
    stock INTEGER DEFAULT 0,

    affiliateLink TEXT NOT NULL,

    description TEXT,

    features TEXT,
    specifications TEXT,
    whyWeRecommend TEXT,
    bestFor TEXT,
    considerations TEXT
);
`);

/*==================================================
 CATEGORIES TABLE
==================================================*/

db.exec(`
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,

    room TEXT NOT NULL,

    icon TEXT,

    status INTEGER DEFAULT 1,

    sortOrder INTEGER DEFAULT 0
);
`);

/*==================================================
 USERS TABLE
==================================================*/

db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    email TEXT NOT NULL UNIQUE,

    password_hash TEXT NOT NULL
);
`);

/*==================================================
 COMPLETE
==================================================*/

console.log("✅ Database initialized successfully.");