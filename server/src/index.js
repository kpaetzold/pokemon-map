/* eslint global-require: "off"  */

import packageJSON from '../package';
import express from 'express';
import graphql from './graphql';
import parseServer from './parse-server';

function loadSettings() {
  // try loading local settings inside shared settings directory
  try {
    const baseSettings = require('../../settings/development/base');
    const serverSettings = require('../../settings/development/server');
    return Object.assign(baseSettings, serverSettings);
  } catch (e) {
    return JSON.parse(process.env.APPLICATION_SETTINGS);
  }
}

const settings = loadSettings();
const app = express();
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const serverPort = process.env.PORT || settings.serverPort;

parseServer.setup(app, packageJSON.name, settings);
graphql.setup(app, IS_DEVELOPMENT);

app.listen(serverPort, () => {
  console.log(`server is totally running on port ${serverPort}`);
});
