var test = require('tap').test;
var esync = require('./');

test('test callbacks', function(t) {
    t.plan(3);

    var wait = esync();

    wait(function(cb) {
        t.pass('task is called');
        cb();
    });

    wait.after(function(err) {
        t.notOk(err, 'after callback is called');
    });

    wait.end(function(err) {
        t.notOk(err, 'end callback is called');
    });
});

test('test empty esync', function(t) {
    t.plan(1);

    var wait = esync();

    wait.end(function(err) {
        t.notOk(err, 'callback is called');
    });
});

test('test async tasks', function(t) {
    t.plan(4);

    var i = 0;
    var wait = esync();

    wait(function(cb) {
        t.ok(i === 0, 'task 1 is called first');
        i = 1;

        setTimeout(cb, 200);
    });

    wait(function(cb) {
        t.ok(i === 1, 'task 2 is called second');
        i = 2;

        setTimeout(cb, 400);
    });

    wait.end(function(err) {
        t.ok(i === 2, 'callback is called last');
        t.notOk(err, 'callback has no error');
    });
});

test('test errors', function(t) {
    t.plan(3);

    var wait = esync();

    wait(function(cb) {
        t.pass('task 1 is called');
        cb("error 1");
    });

    wait(function(cb) {
        t.pass('task 2 is called');
        cb("error 2");
    });

    wait.end(function(err) {
        t.ok(err, 'callback got an error');
    });
});

test('test callback returning variant', function(t) {
    t.plan(2);

    var i = 0;
    var wait = esync();

    var cb = wait();
    setTimeout(function() {
        i = 1;
        cb();
    }, 200);

    wait.end(function(err) {
        t.ok(i === 1, 'callback is called');
        t.notOk(err, 'callback has no error');
    });
});
