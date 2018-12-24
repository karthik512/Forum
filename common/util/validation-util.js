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

    exports.isValidPassword = function(password) {
        console.log(password.length);
        if(exports.isNullOrEmpty(password)) {
            return false;
        } else if(password.length < 6 || password.length > 10) {
            return false;
        }
        return true;
    }

})((typeof exports == undefined || typeof exports == 'undefined')? this['ValidationUtil'] = {}: exports)