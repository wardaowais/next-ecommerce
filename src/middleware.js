import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
    console.log(" Middleware is Running")
    const cookieHeader = req.headers.get("cookie");
    console.log("Here is what inside the cookie of header " , cookieHeader);
    const token = cookieHeader?.split("; ").find(c => c.startsWith("token="))?.split("=")[1];

    console.log("Incoming Request:", req.nextUrl.pathname);
    console.log("Token Found:", token || "No Token Found.....");

    if (!token) {
        console.log("Redirecting to Login: No Token");
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(" Token Verified Successfully");

        // Attach decoded user info to the request object
        req.user = decoded;
       
    } catch (error) {
        console.log(" Invalid Token:", error.message);
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile", "/profile/:path*", "/api/profile", "/api/profile/:path*"],  
};
