// Export a single function.
module.exports = function() {
    var pending = 0;
    var error = null;
    var afterCallback = null;

    // The task queueing function.
    function wait(fn) {
        pending++;
        if (fn) return fn(callback);
        else return callback;
    }

    // The task callback function.
    function callback(err) {
        pending--;
        if (err) error = err;
        flush();
    }

    // Wait for completion of all tasks.
    wait.after = function(cb) {
        afterCallback = cb;
        flush();
    };

    // Helper that flushes errors and completion.
    function flush() {
        if (afterCallback && (error !== null || pending === 0)) {
            afterCallback(error);
            afterCallback = null;
        }
    }

    return wait;
};
