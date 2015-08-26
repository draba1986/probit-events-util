# probit-events-util
probit-events-util is a tool for validating the events's Compatible Events Tolerance and Exclusive Events Tolerance

It can be used to validate command line options.

## Installation

>$ npm install probit-events-util --save

## usage

    var ProbitEvents = require('probit-events-util');
    var sourceEvents = ['a', 'b', 'c', 'd'];
    var pe = ProbitEvents(sourceEvents);
	var result = pe.exclusive(['a', 'b'], 2);
	//result is true

Or another usage

	var ProbitEvents = require('probit-events-util');
	var sourceEvents = ['a', 'b', 'c', 'd'];
	var pe = ProbitEvents(function (eventName) {
		return _.indexOf(sourceEvents, eventName)>=0;
	});

Array or a callback function will be ok.It be used to make sure whether the event with name "eventName" happened.

### .exclusive(events, tolerance)

Validate exclusive events.

Tolerance is the max intersection size of the events and source events;

### .compatible(events, tolerance)

Validate compatible events.

Tolerance is the min intersection size of the events and source events;
