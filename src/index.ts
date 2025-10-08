import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { route_api, route_devices, route_help, route_refresh } from './routes';
import queries from './services/queries';
import healthController from './controllers/health';

const init = async () => {
  const port = process.env.PORT || 3001;
  const app = express();

  // Apply middlewares
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Apply routes
  app.use('/api', route_api);
  app.use('/api/help', route_help);
  app.use('/api/devices', route_devices);
  app.use('/api/refresh', route_refresh);

  app.listen(port, (error) => {
    if (error) {
      console.log(error);
      return process.exit(1);
    }

    console.log(`Server listening on port: ${port}`);
    console.log(`Begin by cURL'ing: http://localhost:3000/api`);

    const interval = Number(process.env.REFRESH_INTERVAL);
    if (isNaN(interval) === false && interval > 0) {
      console.log(`Auto-Check Device Health is enabled with interval: ${interval / 1000}s`);
      setInterval(healthController.refreshDevices, interval);
    } else {
      console.log('Auto-Check Device Health is disabled.');
    }
  });
};

try {
  queries.seedInitial(5);
} catch (error: any) {
  console.log('Database :: Could not seed database:');
  console.log(error.message);
}

init();
