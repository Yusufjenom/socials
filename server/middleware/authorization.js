import jwt from 'jsonwebtoken';


export const isVerified = async (req, res, next) => {
    try {
      let token = req.header('Authorization');

      if(!token){
        throw new Error("access denied")
      }
      if(token.startsWith("Bearer ")){
        token = token.slice(7, token.length).trimLeft();
      }

      const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = verifiedToken;
      next();
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
};