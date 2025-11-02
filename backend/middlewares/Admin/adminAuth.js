import jwt from "jsonwebtoken"

export const getAdminId = async (req , res , next)=>{
      const {adminToken} = req.cookies;
    
        if(!adminToken){
            return res.status(401).json({success : false , message : "Not Authorized"})
        }
    
        try {
            
            const tokenDecode = jwt.verify(adminToken , process.env.JWT_SECRET);
    
            if(tokenDecode.id){
                req.userId = tokenDecode.id
            }else{
                return res.status(401).json({success : false , message : "Not Authorized"})
            }
    
            next()
    
        } catch (error) {
            return res.status(500).json({success : false , message : error.message})
        }
}