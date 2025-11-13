import User from "@/models/user"
import Userdetails from "@/models/userdetails"
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/middleware/mongoose";
const jwt = require('jsonwebtoken');
import fs from 'fs/promises'; // Import the built-in fs/promises module for working with files
import path from 'path'; // Import the built-in path module for handling file paths

// Update USER
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

                const userDetails = await Userdetails.findOne({ "username": user.username });

                let userDetailsR: any = {
                    username: user.username,
                    email: user.email,
                    profile: profile,
                    artistname: artistname,
                    featurefee: featurefee,
                    description: description,
                }

                if (userDetails) {

                    if (artistname !== "") {
                        userDetailsR.artistname = userDetails.artistname;
                    }

                    if (featurefee !== "") {
                        userDetailsR.featurefee = userDetails.featurefee;
                    }

                    if (description !== "") {
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

                return NextResponse.json({
                    success: true,
                    userDetails: userDetailsR,
                    msg: "Contul dvs. a fost activ",
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

        let users = await Userdetails.aggregate([
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
                    'username': decodedToken.username,
                    'email': decodedToken.email
                }
            },
            {
                $project: {
                    'users.profile_status': 1,
                    'users.membership': 1,
                    'users._id': 1,
                    'username': 1,
                    'artistname': 1,
                    'profilepic': 1,
                    'featurefee': 1,
                    'description': 1,
                    'email': 1,
                }
            }
        ]);

        if (users) {
            return NextResponse.json({
                success: true,
                data: users
            }, { status: 200 });
        }
        return NextResponse.json({
            msg: "Something went wrong",
            success: false,
            data: users
        }, { status: 200 });

    } else {
        return NextResponse.json({
            msg: "Method Not Allowed"
        }, { status: 405 });
    }
}

// Get DELETE
export async function DELETE(req: NextRequest, res: NextResponse) {
    if (req.method !== "DELETE") {
        return NextResponse.json({
            msg: "Method Not Allowed"
        }, { status: 405 });
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
    if (!user) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 200 });
    }
    const userdetails: any = await Userdetails.findOne({ "username": decodedToken.username })

    if (!userdetails) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 200 });
    }

    let file = '';

    if (userdetails.profilepic != "" || userdetails.profilepic != "userprofile.png") {
        file = userdetails.profilepic;
    }

    try {

        if (file !== "") {
            // Check if the file exists before attempting to unlink
            // const filePath = path.join(process.cwd(), 'public/posts/', file); // Update the path accordingly

            // // Use fs.access() to check if the file exists
            // await fs.access(filePath, fs.constants.F_OK);

            // // If the file exists, unlink it
            // await fs.unlink(filePath);
        }


        // await Post.findByIdAndDelete(post._id);
        return NextResponse.json({
            success: true,
            msg: "Profile has been deleted"
        }, { status: 200 });


    } catch (error: any) {
        if (error.code === 'ENOENT') {
            // The file does not exist
            // await Post.findByIdAndDelete(post._id);
            return NextResponse.json({
                success: true,
                msg: "Profile has been deleted"
            }, { status: 200 });

        } else {
            // Other error occurred
            console.log(error);
            return NextResponse.json({
                success: false,
                msg: "something went wrong"
            }, { status: 500 });
        }
    }

}