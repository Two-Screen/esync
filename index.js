module.exports = function() {
    // Listeners for completion.
    var afters = [];
    // Pending tasks, one of which is the `end()` call.
    var pending = 1;
    // Error sent to afters, if any.
    var firstError = null;

    // The task queueing function.
    function wait(fn) {
        pending++;
        if (fn) return fn(callback);
        else return callback;
    }

    // The task callback function.
    function callback(err) {
        pending--;
        if (err && !firstError) firstError = err;
        flush();
    }

    // Install callback after completion of all tasks.
    wait.after = function(cb) {
        afters.push(cb);
        flush();
    };

    // Call once all tasks have started. (ie. following `emit()`)
    wait.end = function(cb) {
        if (cb) wait.after(cb);
        callback();
    };

    // Helper that flushes errors and completion.
    function flush() {
        if (firstError === null && pending !== 0) return;

        var list = afters;
        afters = [];

        var num = list.length;
        for (var i = 0; i < num; i++)
            list[i](firstError);
    }

    return wait;
};
