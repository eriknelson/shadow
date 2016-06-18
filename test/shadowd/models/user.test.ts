import chai = require('chai');
const expect = chai.expect;

import User = require('../../../shadowd/models/user');

describe('User suite', function() {
  it('should instantiate with no args', function() {
    const user = new User();
    expect(user).to.not.be.undefined;
    expect(user.mode).to.equal('');
    expect(user.name).to.equal('');
  });

  it('should accept mode and name values', function() {
    const mode = 'foomode';
    const name = 'barname';
    const user = new User(mode, name);
    expect(user).to.not.be.undefined;
    expect(user.mode).to.equal(mode);
    expect(user.name).to.equal(name);
  });
});
