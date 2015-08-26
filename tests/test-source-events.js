var assert = require('assert');
var _ = require('underscore');
var ProbitEvents = require('..');
describe('test source events', function () {
    it('it should be ok when source events is a function', function () {
        var sourceEvents = ['a', 'b', 'c', 'd'];
        var pe = ProbitEvents(function (eventName) {
            return _.indexOf(sourceEvents, eventName)>=0;
        });
        assert.equal(pe.exclusive(['e'], 2), true);
        assert.equal(pe.exclusive(['e', 'f'], 2), true);

        assert.equal(pe.exclusive(['a', 'b'], 2), true);
        assert.equal(pe.exclusive(['a', ['b']], 2), true);
        assert.equal(pe.exclusive(['a', [['b']]], 2), true);
        assert.equal(pe.exclusive(['a', [['b']], 'c'], 2), false);

        assert.equal(pe.exclusive(['a', 'b', 'e'], 2), true);
    });
});