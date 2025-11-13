import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/middleware/mongoose";
const jwt = require('jsonwebtoken');
import User from "@/models/user"
import { sentMail } from '@/app/api/emailtemplate/templates';

// Post POST
export async function POST(req: NextRequest, res: NextResponse) {

    if (req.method !== "POST") {
        return NextResponse.json({ msg: "Method Not Allowed" }, { status: 405 });
    }

    const authorizationHeader = req.headers.get('authorization');
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        // Handle token verification error
        return NextResponse.json({
            success: false,
            msg: "unauthorized access"
        }, { status: 401 });
    }

    const token = authorizationHeader.substring(7); // Removes "Bearer " from the beginning
    const decodedToken = jwt.verify(token, process.env.JWTKEY);
    // Get the current time in seconds (Unix timestamp)
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = decodedToken.exp;
    if (expirationTime <= currentTime) {
        return NextResponse.json({ success: false, msg: "Token has expired" }, { status: 401 });
    }

    await connectDB();
    const user: any = await User.findOne({ "username": decodedToken.username })

    if (!user) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 200 });
    }

    const maisysy = await sentMail(decodedToken.username, decodedToken.email, "withdrawal", { date: "28-July-2002", amount: 1231 });

    return NextResponse.json({ success: true, msg: maisysy }, { status: 200 });
}