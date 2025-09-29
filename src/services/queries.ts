import 'dotenv/config';
import { Pool } from 'pg';
import { IDevice } from '../interfaces/Device';

class QueryService {
  pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT || 5432),
    database: process.env.PGDATABASE,
  });

  // constructor() {
  // this.pool.query('CREATE TABLE devices');
  //   console.log('Attempting to connect to db...');
  //   this.pool.connect((error, client, done) => {
  //     if (error) {
  //       console.log('ERROR: ', error.message);
  //       throw error;
  //     }
  //     console.log('Seems to have connected?');
  //     console.log(client);
  //   });
  // }

  getDevices = async () => {
    return this.pool.query('SELECT * FROM devices ORDER BY id ASC');
  };

  getDeviceById = async (id: number) => {
    return this.pool.query('SELECT * FROM devices WHERE id = $1', [id]);
  };

  addDevice = async ({ id, status, checksum, url }: Partial<IDevice>) => {
    return this.pool.query('INSERT INTO devices (id, status, checksum, url) VALUES ($1, $2, $3, $4)', [
      id,
      status,
      checksum,
      url,
    ]);
  };

  updateDevice = async ({ id, status, checksum, url }: Partial<IDevice>) => {
    return this.pool.query('UPDATE devices SET status = $1, checksum = $2, url = $3 WHERE id = $4', [
      status,
      checksum,
      url,
      id,
    ]);
  };

  removeDevice = async (id: number) => {
    return this.pool.query('DELETE FROM devices WHERE id = $1', [id]);
  };
}

export default new QueryService();
