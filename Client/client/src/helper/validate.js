import toast from 'react-hot-toast';
// validate username
export async function usernameValidate(values){
    const errors = usernameVerify({},values)
    return errors;
}

export async function passwordValidate(values){
    const errors = passwordVerify({},values)
    return errors;
}
export async function resetpasswordValidate(values){
    const errors = passwordVerify({},values)
    if(values.password!==values.confirm_password)
    errors.exist = toast.error("Password doesn't match");
    return errors;
}

// validate password
function passwordVerify(errors={},values)
{
    const specialchars= /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/;
    if(!values.password)
    {
        errors.password = toast.error("Password Required...!");
    }
    else if(values.password.includes(" "))
    {
        errors.password = toast.error("Wrong Password...!");
    }
    else if(values.password.length<4)
    {
        errors.password = toast.error("Password is weak");
    }
    else if(!specialchars.test(values.password)){
        errors.password = toast.error("Password must have special chars");
    }
    return errors;
}




//Here we used toast to complete the task

function usernameVerify(error={},values)
{
    if(!values.username)
    {
        error.username = toast.error('Username Required...!');
    }
    else if(values.username.includes(" ")){
        error.username = toast.error('INVALID Username...!');
    }
    return error;
}
// this function takes values as the argument and initialises
// an empty object
// and toast gets those errors