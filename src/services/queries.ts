import 'dotenv/config';
import { Pool } from 'pg';
import { IDevice } from '../interfaces/Device';

class QueryService {
  pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT || 5432),
    database: process.env.PG_DATABASE,
  });

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

  seedInitial = async () => {
    // Drop pre-existing table.
    await this.pool.query('DROP TABLE IF EXISTS devices');

    // Create new table.
    await this.pool.query(`
      CREATE TABLE devices (
        id SERIAL PRIMARY KEY,
        mac_address TEXT UNIQUE,
        name TEXT,
        url TEXT,
        checksum TEXT,
        status TEXT,
        firmware TEXT,
        hardware TEXT,
        software TEXT
      );
    `);

    // Seed the table.
    await this.pool.query(`
      INSERT INTO devices (id, mac_address, name, url, checksum, status, firmware, hardware, software) VALUES
        (1, 'mac123', 'Device 1', 'http://devices.fauxbiquiti.com/1', 'check_123', 'online', 'fw-1.2.3', 'hw-1.3.3', 'sw-1.33.7'),
        (2, 'mac456', 'Device 2', 'http://devices.fauxbiquiti.com/2', 'check_456', 'offline', 'fw-1.2.2', 'hw-1.2.2', 'sw-1.0.12'),
        (3, 'mac789', 'Device 3', 'http://devices.fauxbiquiti.com/3', 'check_789', 'timedout', 'fw-1.0.1', 'hw-1.2.3', 'sw-0.9.2'),
        (4, 'macabc', 'Device 4', 'http://devices.fauxbiquiti.com/4', 'check_abc', 'online', 'fw-1.7.3rc2', 'hw-0.7.9', 'sw-0.8.7f2'),
        (5, 'macdef', 'Device 5', 'http://devices.fauxbiquiti.com/5', 'check_def', 'online', 'fw-1.2.5', 'hw-1.4.2', 'sw-1.2.3')
    `);
  };
}

export default new QueryService();
