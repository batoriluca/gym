import User from "@/models/user"
import Userdetails from "@/models/userdetails"
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/middleware/mongoose";
const jwt = require('jsonwebtoken');

// Get USER
export async function GET(req: NextRequest, { params }: any) {
    if (req.method == "GET") {

        const { username } = params

        if (!username || username == "") {
            return NextResponse.json({
                success: false,
                msg: "invaild username"
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
        const user2: any = await User.findOne({ "username": username })

        if (!user) {
            return NextResponse.json({
                success: false,
                msg: "Internal Server Error"
            }, { status: 200 });
        }

        if (user2.profile_status == "Pending" || user2.profile_status == "Unverify") {
            return NextResponse.json({
                success: false,
                msg: "Internal Server Error"
            }, { status: 200 });
        }

        let users = await Userdetails.aggregate([
            {
                $match: {
                    username: username,
                    profile_status: "Active"
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'username',
                    foreignField: 'username',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'username',
                    foreignField: 'username',
                    as: 'product'
                }
            },
            // {
            //     $unwind: '$product'
            // },
            {
                $lookup: {
                    from: 'posts',
                    localField: 'username',
                    foreignField: 'username',
                    as: 'post'
                }
            },
            // {
            //     $unwind: '$post'
            // },
            {
                $project: {
                    'user._id': 1,
                    'user.membership': 1,
                    'user.profile_status': 1,
                    'username': 1,
                    'email': 1,
                    'profilepic': 1,
                    'artistname': 1,
                    'featurefee': 1,
                    'description': 1,
                    'product._id': 1,
                    'product.postid': 1,
                    'product.productid': 1,
                    'product.prodslug': 1,
                    'product.productTitle': 1,
                    'product.productCategory': 1,
                    'product.productPrice': 1,
                    'product.productDescription': 1,
                    'product.image1': 1,
                    'product.image2': 1,
                    'product.video': 1,
                    'product.postdate': 1,
                    'product.posttime': 1,
                    'product.status': 1,
                    'post._id': 1,
                    'post.postid': 1,
                    'post.textcontent': 1,
                    'post.imagecontent': 1,
                    'post.videocontent': 1,
                    'post.postdate': 1,
                    'post.posttime': 1,
                    'post.status': 1,
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