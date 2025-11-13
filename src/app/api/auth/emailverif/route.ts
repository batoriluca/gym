import { NextResponse, NextRequest } from 'next/server';
import User from "@/models/user";
import connectDB from "@/middleware/mongoose"
import { generateJwtToken } from '../../function/function';
const jwt = require('jsonwebtoken');

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method === "POST") {
        const { verif_code } = await req.json();
        if (verif_code) {
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

                        if (verif_code as String != user.verify_code) {
                            return NextResponse.json({ success: false, msg: "Please Enter a valid GYM-code" }, { status: 200 });
                        }

                        let profileStatus = "Pending";
                        var newtoken = generateJwtToken({ email: user.email, username: user.username, profile_status: "Pending", membership: user.membership });

                        try {
                            // Update user profile status to "Pending" in the database
                            await User.findByIdAndUpdate(user._id, { profile_status: 'Pending' });

                            // Remove the 'verify_code' field from the user object
                            await User.updateOne({ _id: user._id }, { $unset: { verify_code: "" } });

                            // Create a new JWT token with the updated profile_status
                            let newtoken = jwt.sign(
                                {
                                    email: user.email,
                                    username: user.username,
                                    profile_status: "Pending",
                                    membership: user.membership,
                                },
                                process.env.JWTKEY,
                                { expiresIn: '1h' }
                            );

                            // Send the response with the new token and updated profile status
                            return NextResponse.json({
                                success: true,
                                msg: "Verificarea e-mailului este finalizată",
                                redirect: "payment",
                                p: "Pending", // Assuming you want to send "Pending" as the profile status
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
                success: false,
                msg: "Please enter the code"
            }, { status: 200 });
        }
    } else {
        return NextResponse.json({
            msg: "Method Not Allowed"
        }, { status: 405 });
    }
}


