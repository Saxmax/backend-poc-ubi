import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SuccessResponseMessage } from '../_common/SuccessResponseMessageType';
import { DeviceDefaults, DeviceType, IDevice } from '../_common/DeviceType';

class UtilityService {
  static successResponse = (res: Response, message: SuccessResponseMessage, status = StatusCodes.OK) => {
    const json = typeof message == 'string' ? { message } : message;
    res.status(status).json(json);
  };

  static errorResponse = (res: Response, message: string) => {
    console.log(`OnErrorDatabase :: ${message}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Database error', message });
  };

  static getValidProperties = (data: any, addDefaults = true) => {
    if (addDefaults === true) {
      data = { ...DeviceDefaults, ...data };
    }

    const result = DeviceType.safeParse(data);

    if (result.success === false) {
      console.log(`OnErrorValidation :: ${result.error.message}`);
      return null;
    }

    return result.data;
  };

  static getInsertQuery = (props: any) => {
    let queryProps = '';
    let queryValues = '';
    const keys = Object.keys(props);
    for (let i = 0; i < keys.length; i++) {
      queryProps += keys[i];
      queryValues += `$${i + 1}`;

      if (i < keys.length - 1) {
        queryProps += ', ';
        queryValues += ', ';
      }
    }
    return {
      query: `INSERT INTO ${process.env.PG_TABLE} (${queryProps}) VALUES (${queryValues}) RETURNING *`,
      values: Array.from(Object.values(props)).map((value: any) => value.toString()),
    };
  };

  static getUpdateQuery = (props: any, identifier: number | string, isMac = false) => {
    let update = '';
    const keys = Object.keys(props);
    for (let i = 0; i < keys.length; i++) {
      update += `${keys[i]} = $${i + 1}`;

      if (i < keys.length - 1) {
        update += ', ';
      }
    }

    return {
      query: `UPDATE ${process.env.PG_TABLE} SET ${update} WHERE ${isMac ? 'mac' : 'id'} = ${identifier} RETURNING *`,
      values: Array.from(Object.values(props)).map((value: any) => value.toString()),
    };
  };

  static getRandomFromArray = (arr: any[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };
}

export default UtilityService;
