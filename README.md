**ESync** is a dirt simple module for waiting on a bunch of async tasks.
[![Build Status](https://secure.travis-ci.org/Two-Screen/esync.png)](http://travis-ci.org/Two-Screen/esync)

    var esync = require('esync');

    var wait = esync();

    wait(function(cb) {
        cb();
    });
    wait(function(cb) {
        setTimeout(cb, 1000);
    });
    wait(function(cb) {
        var err = new Error("Oops!");
        cb(err);
    });

    wait.after(function(err) {
        /* ... */
    });

Its main purpose is as a utility for EventEmitters that need to offer listeners
a way to delay execution.

    var esync = require('esync');
    var events = require('events');

    var emitter = new events.EventEmitter();

    emitter.on('foo', function(arg1, arg2, wait) {
        wait(function(cb) {
            setTimeout(cb, 1000);
        });
    });

    var wait = esync();
    emitter.emit('foo', 3, 5, wait);
    wait.after(function(err) {
        /* ... */
    });

The beaty of this is that it's optional; listeners can simply ignore the
parameter.  Additionally, it follows the ‘error first’ callback parameter
convention seen in Node.js.
