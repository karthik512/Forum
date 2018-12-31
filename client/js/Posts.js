function onSubmitThread()
{
    if(validateNewThread()) {
        docid('NewThreadForm').method = 'POST';
        docid('NewThreadForm').action = window.location.pathname;
        docid('NewThreadForm').submit();
    }
}

function validateNewThread()
{
    let title = docid('title').value;
    let content = docid('description').value;

    if(ValidationUtil.isNullOrEmpty(title)) {
        alert('Please enter the title');
        return false;
    }

    if(ValidationUtil.isNullOrEmpty(content)) {
        alert('Please enter the description');
        return false;
    }

    return true;
}