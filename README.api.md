# API

This API service lets you perform any CRUD call, read more below for details on how.

## Main & Help

If you run `GET /api` you will receive a welcoming prompt which can guide you further.
Running `GET /help` will list available API calls.

## GET _(C Read UD)_

- `GET /api`: Welcome prompt
- `GET /help`: List of API calls
- `GET /api/devices`: Returns a list of all devices being monitored
- `GET /api/devices/id/:id`: Returns a specific device by its ID
- `GET /api/devices/mac/:mac`: Returns a specific device by its mac address

## POST _(Create RUD)_

- `POST /api/devices`: Add a new device to be monitored. _Note: Mac address is required!_

## PUT _(CR Update D)_

- `PUT /api/devices/id/:id`: Update data of a device being monitored, by ID
- `PUT /api/devices/mac/:mac`: Update data of a device being monitored, by mac address

## DELETE _(CRU Delete)_

- `DELETE /api/devices/id/:id`: Remove a device from being monitored, by ID
- `DELETE /api/devices/mac/:mac`: Remove a device from being monitored, by mac address
