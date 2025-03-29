import bcrypt from "bcryptjs";
import { User } from "@/models/user.model.js";
import { connectDB } from "@/lib/db";

export async function POST(req) {
    try {
        const { username, email, password, role } = await req.json();
        await connectDB();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return new Response(
                JSON.stringify({ error: "User already exists" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, role });
        await newUser.save();

        return new Response(
            JSON.stringify({ message: "User Registered Successfully" }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
