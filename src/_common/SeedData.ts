import UtilityService from '../services/utilities';
import { DeviceStatus } from './DeviceStatus';
import { IDevice } from './DeviceType';

export const SeedTableCreate = `
  CREATE TABLE ${process.env.PG_TABLE} (
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
`;

export const SeedInsertDevice = () => {
  const dummy_data = getDeviceDummyValues();
  return `
  INSERT INTO ${process.env.PG_TABLE} (mac_address, name, url, checksum, status, firmware, hardware, software) VALUES
  ('${dummy_data.mac_address}', '${dummy_data.name}', '${dummy_data.url}', '${dummy_data.checksum}', '${dummy_data.status}', '${dummy_data.firmware}', '${dummy_data.hardware}', '${dummy_data.software}')
  `;
};

const getRandomMacAddress = () => {
  const hexadecimal_values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  let mac = '';

  for (let i = 0; i < 6; i++) {
    mac += UtilityService.getRandomFromArray(hexadecimal_values);
    mac += UtilityService.getRandomFromArray(hexadecimal_values);

    if (i < 5) {
      mac += ':';
    }
  }

  return mac;
};

export const getRandomChecksum = () => {
  return `${Math.random()}`.substring(2);
};

const getRandomStatus = () => {
  return UtilityService.getRandomFromArray(Object.values(DeviceStatus));
};

export const getRandomVersion = () => {
  const major_values = ['0', '1', '2'];
  const minor_values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const patch_values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const suffixes = ['rc2', 'b1', 'f2', 'rc1beta2', 'f3', 'f1', 'rc1', 'rc3f2'];

  const major = UtilityService.getRandomFromArray(major_values);
  const minor = UtilityService.getRandomFromArray(minor_values);
  const patch = UtilityService.getRandomFromArray(patch_values);

  const useSuffix = Math.random() < 0.1;
  const suffix = useSuffix ? UtilityService.getRandomFromArray(suffixes) : '';

  return `${major}.${minor}.${patch}${suffix}`;
};

const getRandomName = () => {
  const names = [
    'Lorem',
    'Ipsum',
    'Dolor',
    'Sit Amet',
    'Consectetur',
    'Adipiscing',
    'Eiusmod',
    'Tempor',
    'Incididunt',
    'Labore',
    'Et Dolore',
    'Magna Aliqua',
    'Minim Veniam',
    'Nostrud',
    'Quis',
    'Ullamco',
    'Duis Aute',
  ];
  return 'Device ' + UtilityService.getRandomFromArray(names);
};

export const getDeviceUrl = (name: string) => {
  const remove = 'Device ';
  if (name.includes(remove)) {
    name = name.substring(remove.length);
  }
  name = name.replaceAll(' ', '%20');
  return `http://${process.env.PG_TABLE}.fauxbiquiti.com/monitored/${name.toLowerCase()}`;
};

export const getDeviceDummyValues = (): Partial<IDevice> => {
  const name = getRandomName();
  return {
    mac_address: getRandomMacAddress(),
    name,
    url: getDeviceUrl(name),
    checksum: getRandomChecksum(),
    status: getRandomStatus(),
    firmware: getRandomVersion(),
    hardware: getRandomVersion(),
    software: getRandomVersion(),
  };
};
