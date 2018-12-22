(function(exports) {

    exports.info = function(message) {
        console.log(`[${new Date()}] [INFO] [${message}]`);
    }

    exports.error = function(message) {
        console.log(`[${new Date()}] [ERROR] [${message}]`);
    }

    exports.warn = function(message) {
        console.log(`[${new Date()}] [WARNING] [${message}]`);
    }

    exports.fine = function(message) {
        console.log(`[${new Date()}] [FINE] [${message}]`);
    }

})(typeof exports === undefined ? this['Logger'] = {} : exports);