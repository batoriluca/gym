import { NextResponse, NextRequest } from 'next/server';
import User from "@/models/user"
import UserDetails from "@/models/userdetails"
import connectDB from "@/middleware/mongoose"
const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method === "POST") {
        try {
            const { email, password } = await req.json();
            if (email && password) {
                await connectDB()
                const user = await User.findOne({
                    $or: [{ email }, { username: email }]
                });

                // Find User
                if (!user) {
                    return NextResponse.json({ success: false, msg: "nu a fost găsit niciun utilizator" }, { status: 200 });
                }

                // Password Check
                const bytes = CryptoJS.AES.decrypt(user.password, process.env.JWTKEY as string);
                const decryptPassword = bytes.toString(CryptoJS.enc.Utf8);
                if (decryptPassword !== password) {
                    return NextResponse.json({ success: false, msg: "acreditări nevalide" }, { status: 200 });
                }

                // Account Block 
                if (user.profile_status === "Block") {
                    return NextResponse.json({ success: false, msg: "Contul dvs. a fost blocat. Contactați echipa de asistență pentru clienți" }, { status: 200 });
                }

                let redirectPage = "feed";
                let token;
                let membership = user.membership;
                let profileStatus = user.profile_status;

                let userDetailsR: any = {
                    username: user.username,
                    email: user.email
                }

                const userDetails = await UserDetails.findOne({ "username": user.username });

                if (userDetails) {

                    if (userDetails.artistname !== "") {
                        userDetailsR.artistname = userDetails.artistname;
                    }

                    if (userDetails.featurefee !== "") {
                        userDetailsR.featurefee = userDetails.featurefee;
                    }

                    if (userDetails.description !== "") {
                        userDetailsR.description = userDetails.description;
                    }

                    if (userDetails.manufacturerpoint !== "") {
                        userDetailsR.manufacturerpoint = userDetails.manufacturerpoint;
                    }

                    if (userDetails.artistpoint !== "") {
                        userDetailsR.artistpoint = userDetails.artistpoint;
                    }

                    if (userDetails.profilepic !== "") {
                        userDetailsR.profilepic = userDetails.profilepic;
                    }

                }

                if (profileStatus === "Unverify") {
                    redirectPage = "emailverif";
                    userDetailsR = {
                        username: user.username,
                        email: user.email
                    }
                } else if (membership === "Expaired" || membership === "Pending") {
                    redirectPage = "payment";
                    userDetailsR = {
                        username: user.username,
                        email: user.email
                    }
                } else if (profileStatus === "Pending") {
                    redirectPage = "setupacc";
                    userDetailsR = {
                        username: user.username,
                        email: user.email
                    }
                }


                if (profileStatus !== "Unverify") {
                    const currentDate = new Date();
                    const value = user.expireAccOn.allTime - currentDate.getTime();

                    // Check membership time
                    if (value <= 0) {
                        await User.findByIdAndUpdate(user._id, { membership: "Expaired" });
                        membership = "Expaired";
                        redirectPage = "payment";
                    }
                }

                token = jwt.sign(
                    {
                        email: user.email,
                        username: user.username,
                        profile_status: profileStatus,
                        membership: membership
                    },
                    process.env.JWTKEY,
                    { expiresIn: '1h' }
                );

                await User.findByIdAndUpdate(user._id, { token: token });

                return NextResponse.json({
                    success: true,
                    msg: "Da, detaliile sunt corecte",
                    t: token,
                    p: profileStatus,
                    m: membership,
                    redirect: redirectPage,
                    userDetails: userDetailsR
                }, { status: 200 });

            } else {
                return NextResponse.json({
                    success: false,
                    msg: "Internal Server Error"
                }, { status: 500 });
            }
        } catch (err) {
            console.log(err)
            return NextResponse.json({
                success: false,
                msg: "Internal Server Error"
            }, { status: 500 });
        }
    } else {
        return NextResponse.json({
            msg: "Method Not Allowed"
        }, { status: 405 });
    }
}


