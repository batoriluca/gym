import { NextResponse, NextRequest } from 'next/server';
import User from "@/models/user";
import connectDB from "@/middleware/mongoose"
const jwt = require('jsonwebtoken');

export async function GET(req: NextRequest, res: NextResponse) {
    if (req.method === "GET") {
        const authorizationHeader = req.headers.get('authorization');
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
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

                try {
                    await connectDB();
                    const user = await User.findOne({ "email": decodedToken.email, "username": decodedToken.username });

                    // Find User
                    if (!user) {
                        return NextResponse.json({ success: false, msg: "unauthorized access" }, { status: 401 });
                    }

                    if (user.token !== token) {
                        return NextResponse.json({ success: false, msg: "unauthorized access" }, { status: 401 });
                    }

                    var newtoken = jwt.sign({ email: user.email, username: user.username, profile_status: user.profile_status, membership: user.membership }, process.env.JWTKEY, { expiresIn: '1h' });
                    try {
                        // Update user profile status to "Pending" in the database
                        await User.findByIdAndUpdate(user._id, { token: newtoken });

                        // Send the response with the new token and updated profile status
                        return NextResponse.json({
                            success: true,
                            t: newtoken,
                        }, { status: 200 });

                    } catch (err) {
                        console.error(err);
                        return NextResponse.json({ success: false, msg: "OPA...!, Acreditări nevalide" }, { status: 200 });
                    }

                } catch (err) {
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


