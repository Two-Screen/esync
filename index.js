// Export a single function.
module.exports = function() {
    var pending = 0;
    var error = null;
    var callback = null;

    // The task queueing function.
    function wait(fn) {
        pending++;

        // The task callback function.
        return fn(function(err) {
            pending--;
            if (err) error = err;
            flush();
        });
    }

    // Wait for completion of all tasks.
    wait.after = function(cb) {
        callback = cb;
        flush();
    };

    // Helper that flushes errors and completion.
    function flush() {
        if (callback && (error !== null || pending === 0)) {
            callback(error);
            callback = null;
        }
    }

    return wait;
};
