const UserModels = require('../models/User.model');
const UserModel = UserModels.UserModel;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV = require('../config');
// const mongoose = require('mongoose');
const otpGenerator = require('otp-generator');



const verifyUser = async(req, res, next)=>{
    try {  
        const { username } = req.method == "GET" ? req.query : req.body;

        // checking if the user exists
        let exist = await UserModel.findOne({ username });
        if(!exist) return res.status(404).send({ error : "User not present in database!"});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}




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
        // console.log("Someone connected");


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
   
    const { username, password} = req.body;
    try{
        UserModel.findOne({ username })
        .then( user => {
            bcrypt.compare(password, user.password)
            .then(passwordCheck => {

                if(!passwordCheck) return res.status(400).send({ error: "Don't have Password"});

                const token = jwt.sign({
                    userId: user._id,
                    username : user.username
                }, ENV.JWT_SECRET , { expiresIn : "24h"});

                return res.status(200).send({
                    msg: "Login Success",
                    username: user.username,
                    token
                });   
                
            })
            .catch(error => {
                return res.status(400).send({ error: "Password does not Match"})
            })
        })
        .catch(error => {
            return res.status(404).send({error: "User nor registered"});
        })
    } catch(error) {
        return res.status(500).send(error);
    }
}


/** GET: http://localhost:8000/api/user/example123 */
const getUser = async(req,res) =>{
    const { username } = req.params;
    // console.log(username);
    try {
        
        if(!username) return res.status(501).send({ error: "Invalid username"});

        UserModel.findOne({ username }).then((user) =>{
            // if(err) return res.status(500).send({ err });
            console.log(user);
            if(!user) return res.status(501).send({ error : "Couldn't Find the User"});

            // mongoose return unnecessary data with object so convert it into json
            // const { password, ...rest } = Object.assign({}, user.toJSON());

            const data = {
                _id : user._id,
                username: user.username,
                email: user.email,
                profile: user.profile,
                _v: user._v
            }

            return res.status(201).send(data);
        }).catch(err => { return res.status(500).send({ err });})
        

    } catch (error) {
        return res.status(404).send({ error : "Cannot Find User Data"});
    }

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
const updateUser = async (req, res) => {
    try {

    //   const id2 = req.query.id;
    //   const id = new mongoose.Types.ObjectId(id2);
      const { userId } = req.user;
  
      if (userId) {
        const body = req.body;
  
        // Use the new syntax for updateOne
        const result = await UserModel.updateOne({ _id: userId }, body);
  
        if (result ) {
          return res.status(201).send({ msg: "Record Updated...!" });
        } else {
          return res.status(404).send({ error: "User Not Found...!" });
        }
      } else {
        return res.status(401).send({ error: "User Not Found...!" });
      }
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };
  



/** GET: http://localhost:8000/api/generateOTP */
const generateOTP = async(req,res) =>{
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({ code: req.app.locals.OTP })
}


/** GET: http://localhost:8000/api/verifyOTP */
const  verifyOTP = async(req,res) =>{
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}



// successfully redirect user when OTP is valid
/** GET: http://localhost:8000/api/createResetSession */
const  createResetSession = async(req,res) =>{
    if(req.app.locals.resetSession){
        return res.status(201).send({ flag : req.app.locals.resetSession})
   }
   return res.status(440).send({error : "Session expired!"})
 }


// update the password when we have valid session
/** PUT: http://localhost:8000/api/resetPassword */
const  resetPassword = async(req,res) =>{
    try {
        
        if(!req.app.locals.resetSession) return res.status(440).send({error : "Session expired!"});

        const { username, password } = req.body;

        try {
            
            UserModel.findOne({ username})
                .then(user => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            UserModel.updateOne({ username : user.username },
                            { password: hashedPassword}).then(data=>{
                                req.app.locals.resetSession = false; // reset session
                                return res.status(201).send({ msg : "Record Updated...!"})
                            }).catch(err=> {throw err});
                        })
                        .catch( e => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                })
                .catch(error => {
                    return res.status(404).send({ error : "Username not Found"});
                })

        } catch (error) {
            return res.status(500).send({ error })
        }

    } catch (error) {
        return res.status(401).send({ error })
    }
}

module.exports = {register, login, getUser, updateUser, generateOTP, verifyOTP, createResetSession, resetPassword, verifyUser }; 
 