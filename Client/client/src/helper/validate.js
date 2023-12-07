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

export async function profileValidation(values){
    const errors = emailVerify({},values)
    return errors;
}


// Register form validation
export async function registerValidation(values){
    const errors = passwordVerify({}, values);
    usernameVerify(errors, values);
    emailVerify(errors,values);

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



// email verification
function emailVerify(error={},values)
{
    if(!values.email)
    {
        error.email = toast.error('Email Required...!');
    }
    else if(values.email.includes(" ")){
        error.email = toast.error('Wrong Email...!');
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error('Invalid Email address...!');
    }
    return error;
}
// Explanation for expression
// ^: Asserts the start of the string.
// [A-Z0-9._%+-]+: Matches one or more characters that are either uppercase letters (A-Z), digits (0-9), dots (.), underscores (_), percent signs (%), plus signs (+), or hyphens (-).
// @: Matches the at symbol (@), which is a required part of an email address.
// [A-Z0-9.-]+: Matches one or more characters that are either uppercase letters (A-Z), digits (0-9), dots (.), or hyphens (-). This represents the domain name before the top-level domain (TLD).
// \.: Escaped dot character, matching the literal dot before the TLD.
// [A-Z]{2,4}: Matches two to four uppercase letters, representing the TLD (e.g., com, net, org).
// $: Asserts the end of the string.
// i: Case-insensitive flag for the regex.