CREATE TABLE devices
(
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

INSERT INTO devices (id, mac_address, name, url, checksum, status, firmware, hardware, software) VALUES
  (1, 'mac123', 'Device 1', 'http://devices.fauxbiquiti.com/1', 'check_123', 'online', 'fw-1.2.3', 'hw-1.3.3', 'sw-1.33.7')
  (2, 'mac456', 'Device 2', 'http://devices.fauxbiquiti.com/2', 'check_456', 'offline', 'fw-1.2.2', 'hw-1.2.2', 'sw-1.0.12')
  (3, 'mac789', 'Device 3', 'http://devices.fauxbiquiti.com/3', 'check_789', 'timedout', 'fw-1.0.1', 'hw-1.2.3', 'sw-0.9.2')
  (4, 'macabc', 'Device 4', 'http://devices.fauxbiquiti.com/4', 'check_abc', 'online', 'fw-1.7.3rc2', 'hw-0.7.9', 'sw-0.8.7f2')
  (5, 'macdef', 'Device 5', 'http://devices.fauxbiquiti.com/5', 'check_def', 'online', 'fw-1.2.5', 'hw-1.4.2', 'sw-1.2.3')