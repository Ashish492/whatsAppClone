import { PrismaClient } from '@prisma/client';
import { logger } from '@utils';

export class Connection {
  private static db: PrismaClient;

  private static connect() {
    Connection.db = new PrismaClient({ log: ['info'] });
    Connection.db
      .$connect()
      .then(() => logger.info('database connected successfully'))
      .catch((err: unknown) => logger.error('error in connecting database', err));
  }

  static getConnection() {
    if (!this.db) {
      Connection.connect();
    }
    return this.db;
  }

  public static async disConnect() {
    if (Connection.db) {
      await Connection.db.$disconnect();
    }
  }
}
export const db = Connection.getConnection();
