import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import fs from 'fs';
import path from 'path';

let db: SqlJsDatabase;

const dbPath = path.join(__dirname, '../../db/user-center.db');

export async function initDatabase(): Promise<SqlJsDatabase> {
  const SQL = await initSqlJs();

  // 尝试读取已有数据库
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // 初始化建表
  db.run(`
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

  saveDatabase();
  return db;
}

export function getDatabase(): SqlJsDatabase {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}

export function saveDatabase(): void {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dbPath, buffer);
  }
}