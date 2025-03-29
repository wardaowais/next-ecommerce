import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        const cookieHeader = req.headers.get("cookie");
        const token = cookieHeader?.split("; ").find(c => c.startsWith("token="))?.split("=")[1];

        if (!token) {
            return Response.json({ error: "No Token Provided" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await connectDB();

        const user = await User.findOne({ email: decoded.email }).select("-password"); // Hide password
        if (!user) {
            return Response.json({ error: "User Not Found" }, { status: 404 });
        }

        return Response.json({ message: "Profile Data", user }, { status: 200 });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
