import jwt from "jsonwebtoken";

const generateToken = (userInfo) =>{
    try {
        const payload ={
            id:userInfo._id,
            email:userInfo.email,
            role:userInfo.role
        }
        const accessToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET ,
            { expiresIn: '5h' }
        )
        
        return { accessToken };
    } catch (error) {
        return Promise.reject(error);
    }

}

export default generateToken