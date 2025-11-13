import Post from "@/models/post"
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/middleware/mongoose";
const jwt = require('jsonwebtoken');
import User from "@/models/user"

// Get POST
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

        let posts = await Post.aggregate([
            {
                $match: {
                    'status': "Active"
                }
            },
            {
                $lookup: {
                    from: 'userdetails',
                    localField: 'username',
                    foreignField: 'username',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    'user.profilepic': 1,
                    'user.artistname': 1,
                    'user._id': 1,
                    'postid': 1,
                    'username': 1,
                    'textcontent': 1,
                    'imagecontent': 1,
                    'videocontent': 1,
                    'productDescription': 1,
                    'postdate': 1,
                    'posttime': 1,
                    'status': 1,
                    'likedBy': 1,
                    'likes': 1,
                }
            }
        ]);

        if (posts) {
            return NextResponse.json({
                success: true,
                data: posts
            }, { status: 200 });
        }
        return NextResponse.json({
            msg: "Something went wrong",
            success: false,
            data: posts
        }, { status: 200 });

    } else {
        return NextResponse.json({
            msg: "Method Not Allowed"
        }, { status: 405 });
    }
}

// Post POST
export async function POST(req: NextRequest, res: NextResponse) {

    const { textContent, image, video } = await req.json();

    if (req.method !== "POST") {
        return NextResponse.json({ msg: "Method Not Allowed" }, { status: 405 });
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
        return NextResponse.json({ success: false, msg: "Token has expired" }, { status: 401 });
    }

    await connectDB();

    const user: any = await User.findOne({ "username": decodedToken.username })
    // console.log(user.token)
    // console.log(token)
    // if (user.token !== token) {
    //     return NextResponse.json({ success: false, msg: "Token has expired" }, { status: 401 });
    // }

    if (!user) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 200 });
    }

    let postid = "GYMPID" + Math.floor(Math.random() * (99999 - 1111)) + 1;

    const currentDate = new Date().toLocaleString('en-US', { day: 'numeric', month: 'short', year: '2-digit' })
    const currentTime2 = new Date().toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

    const newpost = new Post({
        postid: postid,
        username: decodedToken.username,
        textcontent: textContent,
        imagecontent: image,
        videocontent: video,
        postdate: currentDate,
        posttime: currentTime2,
    })

    await newpost.save();

    return NextResponse.json({ success: true, msg: "Your post has been uploaded" }, { status: 200 });
}