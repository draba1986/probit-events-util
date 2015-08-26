var assert = require('assert');
var _ = require('underscore');
var ProbitEvents = require('..');
describe('test exclusive events', function () {
    it('it should be 0 events happened in exclusive event list when 0 tolerance', function () {
        var sourceEvents = ['a', 'b', 'c', 'd'];
        var pe = ProbitEvents(sourceEvents);
        _.each(sourceEvents, function (eventName) {
            assert.equal(pe.exclusive(eventName), false);
            assert.equal(pe.exclusive(eventName, 0), false);
            assert.equal(pe.exclusive([eventName]), false);
            assert.equal(pe.exclusive([eventName], 0), false);
            assert.equal(pe.exclusive([[eventName]], 0), false);
            assert.equal(pe.exclusive([[[eventName]]], 0), false);
            assert.equal(pe.exclusive([[[[eventName]]]], 0), false);
        });
        assert.equal(pe.exclusive('e'), true);
        assert.equal(pe.exclusive(['e']), true);
        assert.equal(pe.exclusive('e', 0), true);
        assert.equal(pe.exclusive(['e'], 0), true);
        assert.equal(pe.exclusive(['e', 'f'], 0), true);
        assert.equal(pe.exclusive(['e', ['f']], 0), true);
    });
    it('it should be at most 1 events happened in exclusive event list when 1 tolerance', function () {
        var sourceEvents = ['a', 'b', 'c', 'd'];
        var pe = ProbitEvents(sourceEvents);
        _.each(sourceEvents, function (eventName) {
            assert.equal(pe.exclusive(eventName, 1), true);
            assert.equal(pe.exclusive([eventName], 1), true);
        });
        assert.equal(pe.exclusive(['e'], 1), true);
        assert.equal(pe.exclusive(['e', 'f'], 1), true);

        assert.equal(pe.exclusive(['a', 'b'], 1), false);
        assert.equal(pe.exclusive(['a', ['b']], 1), false);
        assert.equal(pe.exclusive(['a', [['b']]], 1), false);

        assert.equal(pe.exclusive(['a', 'e'], 1), true);
    });
    it('it should be at most 2 events happened in exclusive event list when 2 tolerance', function () {
        var sourceEvents = ['a', 'b', 'c', 'd'];
        var pe = ProbitEvents(sourceEvents);
        assert.equal(pe.exclusive(['e'], 2), true);
        assert.equal(pe.exclusive(['e', 'f'], 2), true);

        assert.equal(pe.exclusive(['a', 'b'], 2), true);
        assert.equal(pe.exclusive(['a', ['b']], 2), true);
        assert.equal(pe.exclusive(['a', [['b']]], 2), true);
        assert.equal(pe.exclusive(['a', [['b']], 'c'], 2), false);

        assert.equal(pe.exclusive(['a', 'b', 'e'], 2), true);
    });
});