import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

const protectRoute = async (req, res, next) => {
    // const token = req.cookies.jwt;
    // console.log(token);
    try {
        //Retrive token from cookies
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - no token provided" });
        }

        //verify the token using JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //if token cant be decoded or is invalid 
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - invalid token" });
        }

        //find user based on the decoded userid
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        //attach user to the request object to be used in route handlers
        req.user = user;
        
        //pass control to the next middleware handler
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default protectRoute;
