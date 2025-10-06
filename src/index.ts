import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { route_api, route_devices, route_help } from './routes';
import queries from './services/queries';

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

  app.listen(port, (error) => {
    if (error) {
      console.log(error);
      return process.exit(1);
    }

    console.log(`Server listening on port: ${port}`);
  });
};

try {
  queries.seedInitial();
  console.log('Database :: Successfully seeded database!');
} catch (error: any) {
  console.log('Database :: Could not seed database:');
  console.log(error.message);
}

init();
