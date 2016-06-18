import path = require('path');
import os = require('os');

let _home: string;
let _config_path: string;
let _users_path: string;

export function setHome(homePath: string) {
  _home = expandHome(homePath || '~/.shadow');
  _config_path = path.join(_home, 'config.js');
  _users_path = path.join(_home, 'users');
}

export function getHome() {
  ensureInitialized();
  return _home;
}

export function getUserConfigPath(name: string) {
  ensureInitialized();
  return path.join(_users_path, `${name}.json`);
}

export function getUserLogsPath(name: string, network: string) {
  ensureInitialized();
  return path.join(_home, 'logs', name, network);
}

export function getConfig() {
  ensureInitialized();
  return require(_config_path);
}

export function expandHome(shortenedPath: string) {
  let home;
  if(shortenedPath == null) shortenedPath = '';

  if (os.homedir) {
    home = os.homedir();
  }

  if (!home) {
    home = process.env.HOME || '';  
  }
  
  home = home.replace('$', '$$$$');
  return path.resolve(shortenedPath.replace(/^~($|\/|\\)/, home + '$1'));
}

function ensureInitialized() {
  if(_home == null) setHome(null);
}
