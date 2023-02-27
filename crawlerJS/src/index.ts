import { logger } from '@shared/utils/logger';

import { App } from './app';

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

const app = new App();

const shutdown = async () => {
  try {
    // close server app
    app.close();
    // process.exit(ExitStatus.Success);
  } catch (error) {
    logger.error(`App exited with error: ${error}`);
    process.exit(ExitStatus.Failure);
  }
};

const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

exitSignals.map(sig =>
  process.on(sig, async () => {
    logger.info(`Shutdown signal received`);
    shutdown();
  }),
);

app
  .start()
  .then(() => {
    logger.info('App exited with success');
    process.exit(ExitStatus.Success);
  })
  .catch(error => {
    logger.error(`App exited with error: ${error}`);
    process.exit(ExitStatus.Failure);
  });
