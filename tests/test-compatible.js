var assert = require('assert');
var _ = require('underscore');
var ProbitEvents = require('..');
describe('test compatible events', function () {
    it('it should be always true , no matter how many events in compatible event list when 0-1 tolerance', function () {
        var sourceEvents = ['a', 'b', 'c', 'd'];
        var pe = ProbitEvents(sourceEvents);
        assert.equal(pe.compatible([], 0), true);
        assert.equal(pe.compatible('a', 0), true);
        assert.equal(pe.compatible(['a'], 0), true);
        assert.equal(pe.compatible(['a', 'b'], 0), true);
        assert.equal(pe.compatible(['a', 'b', 'c', 'd'], 0), true);
        assert.equal(pe.compatible(['e', 'f'], 0), true);
        assert.equal(pe.compatible('a', 1), true);
        assert.equal(pe.compatible(['a'], 1), true);
        assert.equal(pe.compatible(['a', 'b'], 1), true);
        assert.equal(pe.compatible(['a', 'b', 'c', 'd'], 1), true);
        assert.equal(pe.compatible(['e', 'f'], 1), true);
    });

    it('it should be 0 or at lease 2 events happened in compatible event list when 2 tolerance', function () {
        var sourceEvents = ['a', 'b', 'c', 'd'];
        var pe = ProbitEvents(sourceEvents);
        assert.equal(pe.compatible([], 2), true);
        assert.equal(pe.compatible(['a'], 2), false);
        assert.equal(pe.compatible(['e'], 2), true);
        assert.equal(pe.compatible(['a', 'b'], 2), true);
        assert.equal(pe.compatible(['a', ['b']], 2), true);
        assert.equal(pe.compatible(['a', [['b']]], 2), true);
        assert.equal(pe.compatible(['a', 'b', 'c'], 2), true);
        assert.equal(pe.compatible(['a', [['b']], 'c'], 2), true);
        assert.equal(pe.compatible(['a', 'b', 'e'], 2), true);

        assert.equal(pe.compatible(['a', 'e'], 2), false);
        assert.equal(pe.compatible(['e', 'f'], 2), true);
        assert.equal(pe.compatible(['e', 'f', 'g'], 2), true);
    });

    it('it should be 0 or all events happened in compatible event list when default tolerance', function () {
        var sourceEvents = ['a', 'b', 'c', 'd'];
        var pe = ProbitEvents(sourceEvents);
        assert.equal(pe.compatible([]), true);
        assert.equal(pe.compatible(['a']), true);
        assert.equal(pe.compatible(['e']), true);
        assert.equal(pe.compatible(['a', 'b']), true);
        assert.equal(pe.compatible(['a', ['b']]), true);
        assert.equal(pe.compatible(['a', 'e']), false);
        assert.equal(pe.compatible(['e', 'f']), true);
        assert.equal(pe.compatible(['a', 'b', 'c']), true);
        assert.equal(pe.compatible(['a', 'b', 'e']), false);
    });
});