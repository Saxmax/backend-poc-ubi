export interface IDevice {
  id?: number;
  status?: number;
  checksum?: number;
  url?: string;
  version?: {
    firmware?: number;
    hardware?: number;
    software?: number;
  };
}
