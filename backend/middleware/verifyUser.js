import {createRemoteJWKSet,jwtVerify} from "jose"
import dotenv from "dotenv"

dotenv.config()

const supabaseUrl=process.env.SUPABASE_URL

if(!supabaseUrl){
    throw new Error("Could not find supabase project, is the url correct?")
}

const JWKS=createRemoteJWKSet(
    new URL(`${supabaseUrl}/auth/v1/.well-known/jwks.json`)
)

export async function verifyuser(req,res,next){
    const headers=req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'No token provided',
        });
      }

      const token = authHeader.split(' ')[1]
      try {
        const {payload}=await jwtVerify(token,JWKS,{
            issuer:`${supabaseUrl}/auth/v1`,
            audience:'authenticated'
        })
        req.userID=payload.sub
      } catch (error) {
        console.error("JWT verification failed:",error.message)
        return res.status(401).json({
            error:"unauthorized",
            message:"Kindly check the token you are passing!"
        })
      }
}