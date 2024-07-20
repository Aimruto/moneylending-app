import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (user,res)=>{
    const token = jwt.sign({userId: user._id, email:user.email},process.env.JWT_SECRET,{
        expiresIn: '1h' //1 hour
    })
    
    //set access token as cookie
    res.cookie("jwt",token,{
        maxAge: 1*60*60*1000, //ms
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite:"strict" ,//CSRF attacks cross-site request forgery attcaks
        secure: process.env.NODE_ENV !== "development"
    });
};

export default generateTokenAndSetCookie;