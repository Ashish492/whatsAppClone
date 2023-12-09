import { PrismaClient } from '@prisma/client';
import { logger } from '@utils';
export class Connection {
  private static db: PrismaClient;
  private connect() {
    Connection.db = new PrismaClient({ log: ['info'] });
    Connection.db
      .$connect()
      .then(() => logger.info('database connected successfully'))
      .catch(err => logger.error('error in connecting database', err));
  }
  static getConnection() {
    if (!this.db) {
      new Connection().connect();
    }
    return this.db;
  }
}
export const db = Connection.getConnection();
