var _ = require('underscore');

function ProbitEvents (sourceEvents) {
    var eventHappened = _.memoize((function () {
        var happened = _.constant(false);
        if (_.isFunction(sourceEvents)) {
            happened = sourceEvents;
        } else if (_.isArray(sourceEvents)) {
            happened = _.partial(_.contains, sourceEvents);
        }
        return function (eventName) {
            if (_.isArray(eventName)) {
                return _.some(eventName, eventHappened);
            } else if (_.isString(eventName)) {
                return happened(eventName);
            }
            return false;
        };
    }()));

    this.exclusive = function (events, tolerance) {
        events = _.isString(events) ? [events] : events;
        tolerance = _.isNumber(tolerance) ? tolerance : 0;
        return _.filter(events, eventHappened).length <= tolerance;
    };

    this.compatible = function (events, tolerance) {
        events = _.isString(events) ? [events] : events;
        tolerance = _.isNumber(tolerance) ? tolerance : events.length;
        return _.filter(events, eventHappened).length >= tolerance;
    };
}

module.exports = function (events) {
    return new ProbitEvents(events);
};