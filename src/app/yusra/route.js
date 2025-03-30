import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        console.log(" Profile API Called!");
        
        return NextResponse.json({ message: "Profile API is working!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "no working niklo.........." }, { status: 400 });
    }
}
