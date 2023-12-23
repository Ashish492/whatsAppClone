import http from 'http';
import { logger } from '@utils';
import { Connection } from '@db';
import app from './app';

const start = async () => {
  const { PORT } = process.env;
  try {
    const server = http.createServer(app);
    await Connection.getConnection();
    server.listen(PORT, () => {
      logger.info(`server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error(error);
  }
};
start();
process.on('beforeExit', async () => {
  await Connection.disConnect();
});
process.on('SIGINT', async () => {
  await Connection.disConnect();
  process.exit();
});
// uncomment to use cluster
// if (cluster.isPrimary) {
//   for (let i = 0; i < os.cpus().length; i++) {
//     /* making child process */
//     cluster.fork()
//   }
//   /* make new instance if server is crashed */
//   cluster.on("exit", () => {
//     cluster.fork()
//   })
// } else {
// start()
//   )
// }
