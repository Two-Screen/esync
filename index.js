// Export a single function.
module.exports = function() {
    var total = 0;
    var completed = 0;
    var errors = [];
    var callback = null;

    // The task queueing function.
    function wait(fn) {
        total++;

        // The task callback function.
        return fn(function(err) {
            if (err) {
                errors.push(err);
            }
            else {
                completed++;
            }
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
        if (callback) {
            var err;
            while (err = errors.shift()) {
                callback(err);
            }
            if (completed === total) {
                callback(null);
            }
        }
    }

    return wait;
};
