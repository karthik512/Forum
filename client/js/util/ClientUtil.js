function docid(id)
{
    return document.getElementById(id);
}

function isEqual(str1, str2, doTrim)
{
    if(str1 != undefined && str2 != undefined) {
        if(doTrim && doTrim == true) {
            str1 = str1.trim();
            str2 = str2.trim();
        }

        if(str1 == str2) {
            return true;
        }
    }
    return false;
}

function showAlert(message) {
    alert(message);
}

function redirect(path)
{
    window.location.href = path;
}