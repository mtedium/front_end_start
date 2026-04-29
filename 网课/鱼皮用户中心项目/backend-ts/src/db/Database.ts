// @ts-nocheck
import { DatabaseSync } from 'node:sqlite';
import path from 'path';

let db: DatabaseSync;

const dbPath = path.join(__dirname, '../../db/user-center.db');

export function initDatabase(): DatabaseSync {
  db = new DatabaseSync(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      userAccount TEXT,
      avatarUrl TEXT,
      gender INTEGER,
      userPassword TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      userStatus INTEGER DEFAULT 0 NOT NULL,
      createTime TEXT DEFAULT (datetime('now')),
      updateTime TEXT DEFAULT (datetime('now')),
      isDelete INTEGER DEFAULT 0 NOT NULL,
      userRole INTEGER DEFAULT 0 NOT NULL,
      planetCode TEXT
    )
  `);

  return db;
}

export function getDatabase(): DatabaseSync {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}