const UserModels = require('../models/User.model');
const UserModel = UserModels.UserModel;
const bcrypt = require('bcrypt');
/** POST: http://localhost:8000/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
const register = async(req,res) =>{
    try {
        const { username, email, password, profile} = req.body;


    // Mongo dropped support for callbacks from its node.js driver as of version 5.0 in favour of a 
    // Promise-only public API. Mongoose also dropped callback support in v7 so findOne() 
    // and other methods now always return a promise.



        const checkduplicateuser = new Promise((resolve, reject) => {

            UserModel.findOne( {username} ).then(
                () => { if(user) reject( { error: " Duplicate username detected "});}
            ).catch(err => { reject(new Error(err));});

            resolve();

            // UserModel.findOne( {username}, (err, user) => {
            //     if(err) reject(new Error(err));
            //     if(user) reject( { error: " Duplicate username detected "});

            //     resolve();
            // })
        });

        const checkduplicateemail = new Promise((resolve, reject) => {

            UserModel.findOne( {email} ).then(
                () => { if(email) reject( { error: " Duplicate email detected "});}
            ).catch(err => { reject(new Error(err));});

            resolve();

            // UserModel.findOne( {email}, (err, email) => {
            //     if(err) reject(new Error(err));
            //     if(email) reject( { error: " Duplicate email detected "});

            //     resolve();
            // })
        });

        // console.log(checkduplicateuser);
        Promise.all([checkduplicateemail, checkduplicateuser])
            .then(() => {
                if(password){
                    bcrypt.hash(password, 10)
                        .then( hashedPassword => {
                            
                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email
                            });

                            // return save result as a response
                            user.save()
                                .then(result => res.status(201).send({ msg: "User Register Successfully"}))
                                .catch(error => res.status(500).send({error}))

                        }).catch(error => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                }
            }).catch(error => {
                return res.status(500).send({ error })
            })


        
    } catch (error) {
        // console.log("Here");
        return res.status(500).send(error);
    }

}


/** POST: http://localhost:8000/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
const login= async(req,res) =>{
   res.json("Login route");
}


/** GET: http://localhost:8000/api/user/example123 */
const getUser = async(req,res) =>{
    res.json("getUser route");
}

/** PUT: http://localhost:8000/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
const updateUser = async(req,res) =>{
    res.json("update user route");
}



/** GET: http://localhost:8000/api/generateOTP */
const generateOTP = async(req,res) =>{
    res.json("Generate OTP route");
}


/** GET: http://localhost:8000/api/verifyOTP */
const  verifyOTP = async(req,res) =>{
    res.json("Verify OTP route");
}



// successfully redirect user when OTP is valid
/** GET: http://localhost:8000/api/createResetSession */
const  createResetSession = async(req,res) =>{
    res.json("Reset session route");
 }


// update the password when we have valid session
/** PUT: http://localhost:8000/api/resetPassword */
const  resetPassword = async(req,res) =>{
    res.json("Reset password route");
}

module.exports = {register, login, getUser, updateUser, generateOTP, verifyOTP, createResetSession, resetPassword }; 
 