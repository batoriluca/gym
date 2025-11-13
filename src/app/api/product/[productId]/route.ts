import Product from "@/models/product"
import { NextResponse } from "next/server";
import connectDB from "@/middleware/mongoose";
const jwt = require('jsonwebtoken');
import User from "@/models/user"
import fs from 'fs/promises'; // Import the built-in fs/promises module for working with files
import path from 'path'; // Import the built-in path module for handling file paths
// Get USER
export async function GET(req: any, { params }: any) {
    if (req.method == "GET") {

        const { productId } = params

        if (!productId || productId == "") {
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

        let product = await Product.aggregate([
            {
                $match: {
                    'status': "Active",
                    prodslug: productId
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
                    'productid': 1,
                    'username': 1,
                    'prodslug': 1,
                    'productTitle': 1,
                    'productCategory': 1,
                    'productPrice': 1,
                    'productDescription': 1,
                    'image1': 1,
                    'image2': 1,
                    'video': 1,
                    'postdate': 1,
                    'posttime': 1,
                    'status': 1,
                }
            }
        ]);

        if (product) {
            return NextResponse.json({
                success: true,
                data: product
            }, { status: 200 });
        }

        return NextResponse.json({
            success: false,
            data: product
        }, { status: 200 });

    } else {
        return NextResponse.json({
            msg: "Method Not Allowed"
        }, { status: 405 });
    }
}

// export async function DELETE(req: any, { params }: any) {
//     if (req.method !== "DELETE") {
//         return NextResponse.json({
//             msg: "Method Not Allowed"
//         }, { status: 405 });
//     }
//     const { postId } = params

//     if (!postId || postId == "") {
//         return NextResponse.json({
//             success: false,
//             msg: "invaild post"
//         }, { status: 401 });
//     }

//     const authorizationHeader = req.headers.get('authorization');
//     if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
//         // Handle token verification error
//         return NextResponse.json({
//             success: false,
//             msg: "unauthorized access"
//         }, { status: 401 });
//     }

//     const token = authorizationHeader.substring(7); // Removes "Bearer " from the beginning
//     const decodedToken = jwt.verify(token, process.env.JWTKEY);
//     // Get the current time in seconds (Unix timestamp)
//     const currentTime = Math.floor(Date.now() / 1000);
//     const expirationTime = decodedToken.exp;
//     if (expirationTime <= currentTime) {
//         return NextResponse.json({
//             success: false,
//             msg: "Token has expired"
//         }, { status: 401 });
//     }

//     await connectDB();
//     const user: any = await User.findOne({ "username": decodedToken.username })
//     if (!user) {
//         return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 200 });
//     }

//     let post = await Post.findOne({ postid: postId, username: decodedToken.username })

//     if (!post) {
//         return NextResponse.json({ success: false, msg: "invaild post id" }, { status: 200 });
//     }

//     let file ='';

//     if (post.imagecontent != "") {
//         file = post.imagecontent;
//     }
//     if (post.videocontent != "") {
//         file = post.videocontent;
//     }

//     try {

//         if (file !== "") {
//             // Check if the file exists before attempting to unlink
//             const filePath = path.join(process.cwd(), 'public/posts/', file); // Update the path accordingly

//             // Use fs.access() to check if the file exists
//             await fs.access(filePath, fs.constants.F_OK);

//             // If the file exists, unlink it
//             await fs.unlink(filePath);
//         }


//         await Post.findByIdAndDelete(post._id);
//         return NextResponse.json({
//             success: true,
//             msg: "Post has been deleted"
//         }, { status: 200 });


//     } catch (error: any) {
//         if (error.code === 'ENOENT') {
//             // The file does not exist
//             await Post.findByIdAndDelete(post._id);
//             return NextResponse.json({
//                 success: true,
//                 msg: "Post has been deleted"
//             }, { status: 200 });

//         } else {
//             // Other error occurred
//             console.log(error);
//             return NextResponse.json({
//                 success: false,
//                 msg: "something went wrong"
//             }, { status: 500 });
//         }
//     }

// }