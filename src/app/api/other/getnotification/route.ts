import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/middleware/mongoose";
import Notification from "@/models/notification"
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

        let notification = await Notification.aggregate([
            {
                $match: {
                    'forUser': decodedToken.username
                }
            },
            {
                $lookup: {
                    from: 'userdetails',
                    localField: 'forUser',
                    foreignField: 'username',
                    as: 'receiverr'
                }
            },
            {
                $unwind: '$receiverr'
            },
            {
                $lookup: {
                    from: 'userdetails',
                    localField: 'byUser',
                    foreignField: 'username',
                    as: 'senderr'
                }
            },
            {
                $unwind: '$senderr'
            },
            {
                $project: {
                    'receiverr.profilepic': 1,
                    'receiverr.artistname': 1,
                    'receiverr._id': 1,
                    'senderr.profilepic': 1,
                    'senderr.artistname': 1,
                    'senderr._id': 1,
                    'notifid': 1,
                    'forUser': 1,
                    'byUser': 1,
                    'message': 1,
                    'type': 1,
                    'link': 1,
                    'lasttime': 1,
                    'lastdate': 1,
                }
            }
        ]);

        if (notification) {
            return NextResponse.json({
                success: true,
                data: notification
            }, { status: 200 });
        }

        return NextResponse.json({
            success: false,
            data: notification
        }, { status: 200 });

    } else {
        return NextResponse.json({
            msg: "Method Not Allowed"
        }, { status: 405 });
    }
}