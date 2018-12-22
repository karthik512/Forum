(function(exports){

    exports.isValidEmail = function(email) {
        var emailRegex = '';
        return emailRegex.test(email);
    }

    exports.isNullOrEmpty = function(str) {
        if(str == undefined || str.trim() == '') {
            return true;
        }
        return false;
    }

})(typeof exports === undefined? this['ValidationUtil'] = {}: exports)