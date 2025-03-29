import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; 
import {cookies} from "next/headers"
import {connectDB} from "@/lib/db"
import {User} from "@/models/user.model.js"

const SECRET_KEY = process.env.JWT_SECRET;

export async function POST(req) {
  
    try {
        const {email,password} = await req.json();
        await connectDB();

        //finding user if exist
        const user = await User.findOne({email});
        if(!user){
            return Response.json({error : "Invalid Credentials"}, {status : 401})
        }

        //checking if password can match or valid 
        const isPasswordValid = await bcrypt.compare(password , user.password)
        if(!isPasswordValid){
            return Response.json({error : "Invalid Credentials"}, {status : 401})
        }

        //creating json web token for seting a cookies
        const token = jwt.sign({email},SECRET_KEY,{expiresIn : "1h"});

        return new Response(
            JSON.stringify({ message: "Login successful", token }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Set-Cookie": `token=${token}; HttpOnly; Secure; Path=/; Max-Age=1200`,
                },
            }
        );
       


        
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
        
    }
}