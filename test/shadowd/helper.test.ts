import chai = require('chai');
import sinon = require('sinon');
const expect = chai.expect;

import path = require('path');
import os = require('os');

import rewire = require('rewire');
const Helper: any = rewire('../../shadowd/helper');

describe('Helper suite', function() {
  const userName = 'foo';
  const network = 'freenode';
  const userHome = process.env.HOME || process.env.USERPROFILE;
  const defaultConfigPath = path.join(userHome, '.shadow');
  let sinonSandbox;

  beforeEach(function(){
    Helper.__set__('_home', null);
    Helper.__set__('_config_path', null);
    Helper.__set__('_users_path', null);
    sinonSandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sinonSandbox.restore();
  });

  it('getHome should return default value if setHome has not been called', function () {
    expect(Helper.getHome()).to.equal(defaultConfigPath);
  });

  it('should not return null if setHome has not been called', function() {
    expect(Helper.getHome()).to.not.equal(null);
  });

  it('getUserConfigPath should have correct path given a username', function () {
    expect(Helper.getUserConfigPath(userName))
      .to.equal(path.join(defaultConfigPath, 'users', `${userName}.json`));
  });

  it('getUserLogsPath should have correct path given a username and netowork', function () {
    expect(Helper.getUserLogsPath(userName, network))
    .to.equal(path.join(defaultConfigPath, 'logs', userName, network));
  });

  it('getConfig should load the default config', function() {
    const fixturesPath =
      path.join(__dirname, '..', '..', '..', 'test', 'fixtures');
    Helper.setHome(fixturesPath);

    // const fixtureFile = path.join(fixturesPath, 'config.default.js');
    const config = Helper.getConfig();
    expect(config.public).to.be.true;
  });

  describe('expandHome', function() {
    const testHome = '/home/testhome';
    it('should prefer $HOME env var if os.homedir() reports null', function() {
      sinonSandbox.stub(os, 'homedir').returns(null);
      sinonSandbox.stub(process.env, 'HOME', testHome);
      const expandHome = Helper.expandHome('~/.shadow');
      expect(expandHome).to.equal(path.join(testHome, '.shadow'));
    });

    it('home should be empty if os.homedir is falsy and process.env.HOME is falsy', function() {
      const homedir = os.homedir;
      const HOME = process.env.HOME;
      delete os.homedir;
      delete process.env.HOME;

      const expandHome = Helper.expandHome('~/.shadow');
      os.homedir = homedir;
      process.env.HOME = HOME;

      expect(expandHome).to.equal('/.shadow');
    });

    it('homedir should not remain deleted', function() {
      expect(os.homedir).to.not.be.undefined;
    });

    it('should not throw a type error if passed null', function() {
      expect(() => Helper.expandHome(null)).to.not.throw(TypeError);
    });
  });
});
