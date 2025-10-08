import { DeviceStatus } from '../_common/DeviceStatus';
import { DeviceOfflineHealth, IHealthType } from '../_common/HealthType';
import { getRandomChecksum, getRandomVersion } from '../_common/SeedData';

class HealthService {
  getDeviceHealth = async (url: string) => {
    // Implemented this way to allow for actual URLs,
    // but otherwise defaulting to a mock health check.
    if (url.startsWith('https://')) {
      try {
        const healthUrl = url.endsWith('/health') ? url : `${url}/health`;
        const result = await fetch(healthUrl);

        if (result.ok === false) {
          console.log(`OnHealthError :: Status Code: ${result.status} (${result.statusText})`);
          throw new Error(`HealthError ${result.status}`);
        }

        return await result.json();
      } catch (error) {
        return DeviceOfflineHealth;
      }
    }

    // If the url is not a "real" url, use a local function for mock data.
    return this._getMockHealth();
  };

  _getMockHealth = () => {
    const timedOut = Math.random() < 0.2;
    const status = timedOut ? DeviceStatus.TimedOut : DeviceStatus.Online;
    return {
      status,
      checksum: timedOut ? '-1' : getRandomChecksum(),
      firmware: timedOut ? 'N/A' : getRandomVersion(),
      hardware: timedOut ? 'N/A' : getRandomVersion(),
      software: timedOut ? 'N/A' : getRandomVersion(),
    } as IHealthType;
  };
}

export default new HealthService();
