import User from "@/models/user"
import Userdetails from "@/models/userdetails"
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/middleware/mongoose";
const jwt = require('jsonwebtoken');

// Get USER
export async function POST(req: NextRequest, { params }: any) {
    if (req.method == "POST") {

        const { username } = params

        if (!username || username == "") {
            return NextResponse.json({
                success: false,
                msg: "invaild username"
            }, { status: 401 });
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
            return NextResponse.json({
                success: false,
                msg: "Token has expired"
            }, { status: 401 });
        }
        await connectDB();
        const user: any = await User.findOne({ "username": decodedToken.username })
        const userdetails: any = await Userdetails.findOne({ "username": username })

        if (!user) {
            return NextResponse.json({
                success: false,
                msg: "Internal Server Error"
            }, { status: 200 });
        }

        if (userdetails.profile_status == "Pending" || userdetails.profile_status == "Unverify") {
            return NextResponse.json({
                success: false,
                msg: "Internal Server Error"
            }, { status: 200 });
        }

        const followBy = await userdetails.followBy || [];
        let follows = await userdetails.follows

        if (followBy.includes(username)) {
            if (follows == 0) {
                follows = 0;
            } else {
                follows = follows - 1;
            }
            // User already liked the post, so remove the like
            await Userdetails.updateOne({ _id: userdetails._id }, { $pull: { followBy: username } });
            await Userdetails.findByIdAndUpdate(userdetails._id, { follows: follows });

            return NextResponse.json({ success: true, follows: false }, { status: 200 });
        } else {
            // User hasn't liked the post yet, so add the like
            follows = follows + 1;
            await userdetails.updateOne({ _id: userdetails._id }, { $addToSet: { followBy: username } });
            await Userdetails.findByIdAndUpdate(userdetails._id, { follows: follows });
            return NextResponse.json({ success: true, follows: true }, { status: 200 });
        }

    } else {
        return NextResponse.json({
            msg: "Method Not Allowed"
        }, { status: 405 });
    }
}