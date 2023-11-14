import toast from 'react-hot-toast';

export async function usernameValidate(values){
    const errors = usernameVerify({},values)
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