var assert = require('assert');
var _ = require('underscore');
var ProbitEvents = require('..');
describe('test inevitable events', function () {
    it('it should always be true when event list is blank', function () {
        var sourceEvents = ['a', 'b', 'c', 'd'];
        var pe = ProbitEvents(sourceEvents);
        assert.equal(pe.inevitable([]), true);
        var pe2 = ProbitEvents([]);
        assert.equal(pe.inevitable([]), true);
    });
    it('it should be all events happened in inevitable event list', function () {
        var sourceEvents = ['a', 'b', 'c', 'd'];
        var pe = ProbitEvents(sourceEvents);
        assert.equal(pe.inevitable(['e']), false);
        assert.equal(pe.inevitable(['e', 'f']), false);
        assert.equal(pe.inevitable(['a']), true);
        assert.equal(pe.inevitable(['a', 'b']), true);
        assert.equal(pe.inevitable(['a', ['b']]), true);
        assert.equal(pe.inevitable(['a', [['b']]]), true);
        assert.equal(pe.inevitable(['a', 'e']), false);
    });
});