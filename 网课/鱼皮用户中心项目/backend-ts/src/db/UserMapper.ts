import { getDatabase, saveDatabase } from './Database';
import { User } from '../model/User';
import { SqlValue } from 'sql.js';

export class UserMapper {
  // 插入用户
  insert(user: User): number {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO user (userAccount, userPassword, planetCode, userStatus, isDelete, userRole)
      VALUES (?, ?, ?, 0, 0, 0)
    `);
    stmt.run([user.userAccount || '', user.userPassword || '', user.planetCode || ''] as SqlValue[]);
    stmt.free();
    saveDatabase();

    const result = db.exec('SELECT last_insert_rowid() as id');
    return result[0]?.values[0]?.[0] as number;
  }

  // 按账户和密码查询
  findByAccountAndPassword(userAccount: string, userPassword: string): User | undefined {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM user WHERE userAccount = ? AND userPassword = ?');
    stmt.bind([userAccount, userPassword] as SqlValue[]);
    if (stmt.step()) {
      const row = stmt.getAsObject();
      stmt.free();
      return row as unknown as User;
    }
    stmt.free();
    return undefined;
  }

  // 按账户查询
  findByAccount(userAccount: string): User | undefined {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM user WHERE userAccount = ?');
    stmt.bind([userAccount] as SqlValue[]);
    if (stmt.step()) {
      const row = stmt.getAsObject();
      stmt.free();
      return row as unknown as User;
    }
    stmt.free();
    return undefined;
  }

  // 按星球编号查询
  findByPlanetCode(planetCode: string): User | undefined {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM user WHERE planetCode = ?');
    stmt.bind([planetCode] as SqlValue[]);
    if (stmt.step()) {
      const row = stmt.getAsObject();
      stmt.free();
      return row as unknown as User;
    }
    stmt.free();
    return undefined;
  }

  // 按ID查询
  findById(id: number): User | undefined {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM user WHERE id = ?');
    stmt.bind([id] as SqlValue[]);
    if (stmt.step()) {
      const row = stmt.getAsObject();
      stmt.free();
      return row as unknown as User;
    }
    stmt.free();
    return undefined;
  }

  // 模糊搜索用户名
  searchByUsername(username: string): User[] {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM user WHERE username LIKE ?');
    stmt.bind([`%${username}%`] as SqlValue[]);
    const results: User[] = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject() as unknown as User);
    }
    stmt.free();
    return results;
  }

  // 删除用户
  deleteById(id: number): boolean {
    const db = getDatabase();
    const stmt = db.prepare('DELETE FROM user WHERE id = ?');
    stmt.run([id] as SqlValue[]);
    stmt.free();
    saveDatabase();
    return db.getRowsModified() > 0;
  }
}

export const userMapper = new UserMapper();