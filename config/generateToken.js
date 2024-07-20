import jwt from 'jsonwebtoken';

//to geerate a JWT and set it as a cookie
const generateTokenAndSetCookie = (user,res)=>{
    //creates a JWT token with user id and email
    const token = jwt.sign({userId: user._id, email:user.email},  //payload
        process.env.JWT_SECRET,{
        expiresIn: '1h' //1 hour token expiration time
    })
    
    //set access token as an http only cookie
    res.cookie("jwt",token,{
        maxAge: 1*60*60*1000, //ms
        httpOnly: true,   //prevent XSS attacks cross-site scripting attacks
        sameSite:"strict" ,  //CSRF attacks cross-site request forgery attcaks
        secure: process.env.NODE_ENV !== "development" //sends the cookie over HTTPs in production
    });
};

export default generateTokenAndSetCookie;