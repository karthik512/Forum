function registerUser()
{
    if(validateRegistrationForm()) {
        Logger.info(' Registration Successfully Validated');
        docid('user-register-form').method = 'POST';
        docid('user-register-form').action = '/user';
        docid('user-register-form').submit();
    }
}

function loginUser()
{
    if(validateLoginForm()) {
        Logger.info(' Login Form Successfully Validated ');
        docid('login-form').method = 'POST';
        docid('login-form').action = '/user/login';
        docid('login-form').submit();
    }
}

function validateLoginForm()
{
    let userMail = docid('email').value;
    let userPassword = docid('password').value;

    if(ValidationUtil.isNullOrEmpty(userMail)) {
        showAlert('Please enter your email ID');
        return false;
    }

    if(ValidationUtil.isNullOrEmpty(userPassword)) {
        showAlert('Please enter a Password');
        return false;
    }
    return true;
}

function validateRegistrationForm()
{
    let userEmail = docid('email').value;
    let userPassword = docid('password').value;
    let confPassword = docid('confirm-password').value;

    if(ValidationUtil.isNullOrEmpty(userEmail)) {
        showAlert('Please enter your email ID');
        return false;
    }

    if(ValidationUtil.isNullOrEmpty(userPassword)) {
        showAlert('Please enter a Password');
        return false;
    }

    if(ValidationUtil.isNullOrEmpty(confPassword)) {
        showAlert('Please confirm your password');
        return false;
    }

    if(!isEqual(userPassword, confPassword, false)) {
        showAlert('The passwords do not match');
        return false;
    }

    if(!ValidationUtil.isValidPassword(userPassword)) {
        showAlert('Please enter another password');
        return false;
    }
    return true;
}