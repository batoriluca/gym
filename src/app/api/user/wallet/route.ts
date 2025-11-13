import User from "@/models/user"
import Wallet from "@/models/wallet"
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/middleware/mongoose";
const jwt = require('jsonwebtoken');

// Update USER
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

                let wallet = await Wallet.aggregate([
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'username',
                            foreignField: 'username',
                            as: 'users'
                        }
                    },
                    {
                        $match: {
                            'users.username': decodedToken.username,
                            'users.email': decodedToken.email
                        }
                    },
                    {
                        $project: {
                            'walletid': 1,
                            'username': 1,
                            'amount': 1,
                            'lockamount': 1,
                            'status': 1,
                            'updatetime': 1,
                        }
                    }
                ]);

                if (wallet) {
                    return NextResponse.json({
                        success: true,
                        data: wallet
                    }, { status: 200 });
                }

                return NextResponse.json({
                    success: false,
                    data: wallet
                }, { status: 200 });


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
