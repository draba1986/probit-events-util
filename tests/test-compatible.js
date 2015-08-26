var assert = require('assert');
var _ = require('underscore');
var ProbitEvents = require('..');
describe('test compatible events', function () {
    it('it should be always true , no matter how many events in compatible event list when 0 tolerance', function () {
        var sourceEvents = ['a', 'b', 'c', 'd'];
        var pe = ProbitEvents(sourceEvents);
        assert.equal(pe.compatible('a', 0), true);
        assert.equal(pe.compatible(['a'], 0), true);
        assert.equal(pe.compatible(['a', 'b'], 0), true);
        assert.equal(pe.compatible(['a', 'b', 'c', 'd'], 0), true);
        assert.equal(pe.compatible(['e', 'f'], 0), true);
    });
    it('it should be at lease 1 events happened in compatible event list when 1 tolerance', function () {
        var sourceEvents = ['a', 'b', 'c', 'd'];
        var pe = ProbitEvents(sourceEvents);
        _.each(sourceEvents, function (eventName) {
            assert.equal(pe.compatible(eventName, 1), true);
            assert.equal(pe.compatible([eventName, 'e'], 1), true);
            assert.equal(pe.compatible([eventName, ['e']], 1), true);
        });
        assert.equal(pe.compatible('e', 1), false);
        assert.equal(pe.compatible(['e'], 1), false);
        assert.equal(pe.compatible(['e', 'f'], 1), false);
        assert.equal(pe.compatible(['e', ['f']], 1), false);
    });

    it('it should be at lease 2 events happened in compatible event list when 2 tolerance', function () {
        var sourceEvents = ['a', 'b', 'c', 'd'];
        var pe = ProbitEvents(sourceEvents);
        assert.equal(pe.compatible(['a'], 2), false);
        assert.equal(pe.compatible(['e'], 2), false);
        assert.equal(pe.compatible(['a', 'b'], 2), true);
        assert.equal(pe.compatible(['a', ['b']], 2), true);
        assert.equal(pe.compatible(['a', [['b']]], 2), true);
        assert.equal(pe.compatible(['a', 'e'], 2), false);
        assert.equal(pe.compatible(['e', 'f'], 2), false);
        assert.equal(pe.compatible(['a', 'b', 'e'], 2), true);
        assert.equal(pe.compatible(['a', 'b', 'c'], 2), true);
        assert.equal(pe.compatible(['a', [['b']], 'c'], 2), true);
    });

    it('it should be all events happened in compatible event list when default tolerance', function () {
        var sourceEvents = ['a', 'b', 'c', 'd'];
        var pe = ProbitEvents(sourceEvents);
        assert.equal(pe.compatible(['a']), true);
        assert.equal(pe.compatible(['e']), false);
        assert.equal(pe.compatible(['a', 'b']), true);
        assert.equal(pe.compatible(['a', ['b']]), true);
        assert.equal(pe.compatible(['a', 'e']), false);
        assert.equal(pe.compatible(['e', 'f']), false);
        assert.equal(pe.compatible(['a', 'b', 'c']), true);
        assert.equal(pe.compatible(['a', 'b', 'e']), false);
    });
});