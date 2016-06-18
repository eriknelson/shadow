import chai = require('chai');
const expect = chai.expect;
import Helper = require('../../../shadowd/helper');

import path = require('path');
Helper.setHome(path.join(
  __dirname, '..', '..', '..', '..', 'defaults'
));

import proxyquire = require('proxyquire');
const Module = proxyquire('../../../shadowd/models/chan', { Helper });
const Chan = Module.Chan;

describe('Chan suite', function() {
  it('should instantiate with no args', function() {
    const chan = new Chan();
    expect(chan).to.not.be.undefined;
    expect(chan.messages.length).to.equal(0);
    expect(chan.name).to.equal('');
    expect(chan.topic).to.equal('');
    expect(chan.type).to.equal(Module.Type.CHANNEL);
    expect(chan.unread).to.equal(0);
    expect(chan.highlight).to.equal(false);
    expect(chan.users.length).to.equal(0);
    expect(chan.id).to.equal(1)
  });
});
