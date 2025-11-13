import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/middleware/mongoose";
const jwt = require('jsonwebtoken');
import ChatDetail from "@/models/chatdetail"

// UPDATE USER
export async function PATCH(req: NextRequest, res: NextResponse) {
    if (req.method == "PATCH") {
        const { artistname, description, featurefee } = await req.json();
        const authorizationHeader = req.headers.get('authorization');
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            // Handle token verification error
            return NextResponse.json({
                success: false,
                msg: "unauthorized access"
            }, { status: 401 });
        }

        const token = authorizationHeader.substring(7); // Removes "Bearer " from the beginning
        try {
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
            try {


            } catch (err) {
                console.log(err)
                return NextResponse.json({
                    success: false,
                    msg: "Internal Server Error"
                }, { status: 200 });
            }
        } catch (error) {
            // Handle token verification error
            return NextResponse.json({
                success: false,
                msg: "unauthorized access"
            }, { status: 401 });
        }
    } else {
        return NextResponse.json({
            msg: "Method Not Allowed"
        }, { status: 405 });
    }
}

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
        let Chatss = await ChatDetail.aggregate([
            {
                $match: {
                    // 'sender': req.body.sender,
                    $or: [
                        { sender: decodedToken.username },
                        { receiver: decodedToken.username }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'userdetails',
                    localField: 'sender',
                    foreignField: 'username',
                    as: 'senderr'
                }
            },
            {
                $unwind: '$senderr'
            },
            {
                $lookup: {
                    from: 'userdetails',
                    localField: 'receiver',
                    foreignField: 'username',
                    as: 'receiverr'
                }
            },
            {
                $unwind: '$receiverr'
            },
            {
                $project: {
                    'receiverr.profilepic': 1,
                    'receiverr.artistname': 1,
                    'senderr.profilepic': 1,
                    'senderr.artistname': 1,
                    'sender': 1,
                    'seenmessage': 1,
                    'receiver': 1,
                    'lastmessage': 1,
                    'lasttime': 1,
                    'lastdate': 1,
                }
            }
        ]);

        if (Chatss.length == 0) {
            return NextResponse.json({
                success: false,
                msg: "No chat Found",
                chats: Chatss
            }, { status: 200 });
        }
        return NextResponse.json({
            success: true,
            chats: Chatss
        }, { status: 200 });

    } else {
        return NextResponse.json({
            msg: "Method Not Allowed"
        }, { status: 405 });
    }
}