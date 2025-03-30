// import { connectDB } from "@/lib/db";
// import { User } from "@/models/user.model";
// import jwt from "jsonwebtoken";
// export const runtime = "nodejs"; 

// export async function GET(req) {
//     try {
//         console.log(" Profile API Called!");
//         const cookieHeader = req.headers.get("cookie");
//         console.log("this ia the log of cookie inside profile route :", cookieHeader)
//         const token = cookieHeader?.split("; ").find(c => c.startsWith("token="))?.split("=")[1];

//         if (!token) {
//             return Response.json({ error: "No Token Provided" }, { status: 401 });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         await connectDB();

//         const user = await User.findOne({ email: decoded.email }).select("-password"); // Hide password
//         if (!user) {
//             return Response.json({ error: "User Not Found" }, { status: 404 });
//         }

//         return Response.json({ message: "Profile Data", user }, { status: 200 });

//     } catch (error) {
//         return Response.json({ error: error.message }, { status: 500 });
//     }
// }

import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        console.log(" Profile API Called!");
        
        return NextResponse.json({ message: "Profile API is working!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "no working niklo.........." }, { status: 400 });
    }
}
