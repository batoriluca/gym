import User from "@/models/user"
import Userdetails from "@/models/userdetails"
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/middleware/mongoose";
const jwt = require('jsonwebtoken');

// UPDATE USER
export async function PATCH(req: NextRequest, res: NextResponse) {
    if (req.method == "PATCH") {
        const { artistname, description, featurefee, profile } = await req.json();
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
            const userdetails: any = await Userdetails.findOne({ "username": decodedToken.username })
            if (!user) {
                return NextResponse.json({
                    success: false,
                    msg: "Internal Server Error"
                }, { status: 200 });
            }
            try {
                await User.findByIdAndUpdate(user._id, { profile_status: 'Active' })

                await Userdetails.findByIdAndUpdate(userdetails._id, {
                    artistname: artistname,
                    featurefee: featurefee,
                    description: description,
                    profilepic: profile,
                    profile_status: "Active",
                });

                var newtoken = jwt.sign({ email: decodedToken.email, username: decodedToken.username, profile_status: "Active", membership: user.membership }, process.env.JWTKEY, { expiresIn: "1h" });

                return NextResponse.json({
                    success: true,
                    msg: "Contul dvs. a fost activ",
                    t: newtoken,
                    p: "Active",
                    redirect: "feed",
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
        const userdetails: any = await Userdetails.findOne({ "username": decodedToken.username })
        if (!user) {
            return NextResponse.json({
                success: false,
                msg: "Internal Server Error"
            }, { status: 200 });
        }
        // Get the query string from the request URL
        const queryString = req.url.split('?')[1]; // Get the part after the '?'
        // Parse the query string into a URLSearchParams object
        const params = new URLSearchParams(queryString);
        // Get the value of the 'search' parameter
        const searchValue = params.get('search');

        if (searchValue || searchValue !== "") {

            let userdetails = await Userdetails.find({
                $or: [
                    { artistname: { $regex: new RegExp(searchValue as string, "i") } },
                    { username: { $regex: new RegExp(searchValue as string, "i") } }
                ],
                profile_status: "Active",
            });

            if (userdetails.length > 0) {
                // Map the userdetails to create an array of data objects
                const data = userdetails.map((user: any) => ({
                    profile: user.profilepic,
                    artistname: user.artistname,
                    username: user.username
                }));
                return NextResponse.json({
                    success: true, data: data
                }, { status: 200 });
            } else {
                return NextResponse.json({
                    success: false,
                    msg: "No user found"
                }, { status: 200 });
            }

        }

        // await connectDB();
        // const user: any = await User.findOne({ "username": decodedToken.username })
        // const userdetails: any = await Userdetails.findOne({ "username": decodedToken.username })
        return NextResponse.json({
            success: false,
            msg: "unauthorized access"
        }, { status: 200 });

    } else {
        return NextResponse.json({
            msg: "Method Not Allowed"
        }, { status: 405 });
    }
}