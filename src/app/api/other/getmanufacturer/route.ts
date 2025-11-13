import User from "@/models/user"
import Userdetails from "@/models/userdetails"
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/middleware/mongoose";
const jwt = require('jsonwebtoken');

// Get USER
export async function GET(req: NextRequest, res: NextResponse) {
    if (req.method == "GET") {
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
        if (!user) {
            return NextResponse.json({
                success: false,
                msg: "Internal Server Error"
            }, { status: 200 });
        }

        let users = await Userdetails.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'username',
                    foreignField: 'username',
                    as: 'users'
                }
            },
            { $match: { 'users.profile_status': "Active" } },
            {
                $project: {
                    'username': 1,
                    'artistname': 1,
                    'profilepic': 1,
                    'email': 1,
                    'manufacturerpoint': 1,
                }
            },
            { $sort: { "manufacturerpoint": -1 } }
        ]);

        if (users) {
            return NextResponse.json({
                success: true,
                data: users
            }, { status: 200 });
        }

        return NextResponse.json({
            success: false,
            data: users
        }, { status: 200 });

    } else {
        return NextResponse.json({
            msg: "Method Not Allowed"
        }, { status: 405 });
    }
}