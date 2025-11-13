import Post from "@/models/post"
import { NextResponse } from "next/server";
import connectDB from "@/middleware/mongoose";
const jwt = require('jsonwebtoken');
import User from "@/models/user"

// Get USER
export async function POST(req: any, { params }: any) {
    if (req.method !== "POST") {
        return NextResponse.json({
            msg: "Method Not Allowed"
        }, { status: 405 });
    }

    const { postId } = params

    if (!postId || postId == "") {
        return NextResponse.json({
            success: false,
            msg: "invaild post"
        }, { status: 401 });
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

    let post = await Post.findOne({ postid: postId })

    if (!post) {
        return NextResponse.json({ success: false, msg: "invaild post id" }, { status: 200 });
    }
    const likedBy = post.likedBy || [];
    let likes = post.likes

    if (likedBy.includes(decodedToken.username)) {
        if (likes == 0) {
            likes = 0;
        } else {
            likes = likes - 1;
        }
        await Post.updateOne({ _id: post._id }, { $pull: { likedBy: decodedToken.username } });
        await Post.findByIdAndUpdate(post._id, { likes: likes })

        return NextResponse.json({ success: true, liked: false }, { status: 200 });
    } else {
        // User hasn't liked the post yet, so add the like
        likes = likes + 1;
        await Post.updateOne({ _id: post._id }, { $addToSet: { likedBy: decodedToken.username } });
        await Post.findByIdAndUpdate(post._id, { likes: likes })
        return NextResponse.json({ success: true, liked: true }, { status: 200 });
    }

}