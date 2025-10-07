import { Pool } from 'pg';
import { SeedInsertDevice, SeedTableCreate, SeedTableDrop } from '../_common/SeedData';
import UtilityService from './utilities';

class QueryService {
  pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT || 5432),
    database: process.env.PG_DATABASE,
  });

  getDevices = async () => {
    return this.pool.query(`SELECT * FROM ${process.env.PG_TABLE} ORDER BY id ASC`);
  };

  getDevice = async (identifier: number | string) => {
    const isMac = typeof identifier === 'string';
    const query = `SELECT * FROM ${process.env.PG_TABLE} WHERE ${isMac ? 'mac_address' : 'id'} = $1`;
    return this.pool.query(query, [identifier]);
  };

  addDevice = async (props: any) => {
    const insert = UtilityService.getInsertQuery(props);
    return this.pool.query(insert.query, insert.values);
  };

  updateDevice = async (identifier: number | string, props: any) => {
    const update = UtilityService.getUpdateQuery(props, identifier, typeof identifier == 'string');
    return this.pool.query(update.query, update.values);
  };

  removeDevice = async (identifier: number | string) => {
    const isMac = typeof identifier === 'string';
    const query = `DELETE FROM ${process.env.PG_TABLE} WHERE ${isMac ? 'mac_address' : 'id'} = $1 RETURNING *`;
    return this.pool.query(query, [identifier]);
  };

  checkExists = async () => {
    const query = `SELECT to_regclass('public.${process.env.PG_TABLE}') IS NOT NULL AS exists;`;
    const result = await this.pool.query(query);
    return result.rows[0].exists == true;
  };

  seedInitial = async (seedCount: number) => {
    const tableExists = await this.checkExists();
    if (tableExists == true) return;

    await this.pool.query(SeedTableCreate);

    for (let i = 0; i < seedCount; i++) {
      await this.pool.query(SeedInsertDevice());
    }
  };
}

export default new QueryService();
