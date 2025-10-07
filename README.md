# Fauxbiquiti Device Monitoring System

This is a service meant to compile and run on any computer by utilizing Docker.
It monitors registered devices (routers, security cameras, and more).

## Installation

- Clone this repository `git clone https://github.com/Saxmax/backend-poc-ubi.git`
- Change directory `cd backend-poc-ubi`
- Install modules `npm i`
- Create a `.env` file by running `npm run create:env`
- Initialize a docker container `docker compose up --build`

## Using

When you have the backend application up and running in a local docker container
you can perform any of the listed API calls to `http://localhost:3000/api`.

Either use cURL in the terminal, or any software like Postman or Insomnia.

This service supports all CRUD calls, but you can read more about the API calls
in the `README.api.md` readme file
