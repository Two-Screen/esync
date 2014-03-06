var test = require('tap').test;
var esync = require('./');

test('test callbacks', function(t) {
    t.plan(2);

    var wait = esync();

    wait(function(cb) {
        t.pass('task is called');
        cb();
    });

    wait.after(function(err) {
        t.notOk(err, 'after is called');
    });
});

test('async functions', function(t) {
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

    wait.after(function(err) {
        t.ok(i === 2, 'after is called last');
        t.notOk(err, 'after has no error');
    });
});

test('errors', function(t) {
    t.plan(1);

    var wait = esync();

    wait(function(cb) {
        cb("error 1");
    });

    wait(function(cb) {
        cb("error 2");
    });

    wait.after(function(err) {
        t.ok(err, 'after got an error');
    });
});
