// @ts-nocheck
import { getDatabase } from './Database';
import { User } from '../model/User';

export class UserMapper {
  insert(user) {
    const db = getDatabase();
    const stmt = db.prepare(
      'INSERT INTO user (userAccount, userPassword, planetCode, userStatus, isDelete, userRole) VALUES (?, ?, ?, 0, 0, 0)'
    );
    const result = stmt.run(user.userAccount || '', user.userPassword || '', user.planetCode || '');
    return Number(result.lastInsertRowid);
  }

  findByAccountAndPassword(userAccount, userPassword) {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM user WHERE userAccount = ? AND userPassword = ?');
    const row = stmt.get(userAccount, userPassword);
    if (!row) return undefined;
    return row as User;
  }

  findByAccount(userAccount) {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM user WHERE userAccount = ?');
    const row = stmt.get(userAccount);
    if (!row) return undefined;
    return row as User;
  }

  findByPlanetCode(planetCode) {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM user WHERE planetCode = ?');
    const row = stmt.get(planetCode);
    if (!row) return undefined;
    return row as User;
  }

  findById(id) {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM user WHERE id = ?');
    const row = stmt.get(id);
    if (!row) return undefined;
    return row as User;
  }

  searchByUsername(username) {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM user WHERE (username LIKE ? OR username IS NULL)');
    const results = [];
    for (const row of stmt.iterate('%' + username + '%')) {
      results.push(row as User);
    }
    return results;
  }

  deleteById(id) {
    const db = getDatabase();
    const stmt = db.prepare('DELETE FROM user WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
}

export const userMapper = new UserMapper();