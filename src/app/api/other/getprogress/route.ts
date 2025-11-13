import UserDetail from "@/models/userdetails";
import User from "@/models/user";
import Post from "@/models/post";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/middleware/mongoose";
const jwt = require('jsonwebtoken');

// Get USER
export async function GET(req: NextRequest, res: NextResponse) {
    if (req.method === "GET") {
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
        const user = await User.findOne({ "username": decodedToken.username });
        if (!user) {
            return NextResponse.json({
                success: false,
                msg: "Internal Server Error"
            }, { status: 500 });
        }

        // Get the current month (e.g., March => 2)
        const currentMonth = new Date().getMonth();

        // Count the posts of the user with status "Active" created in the current month
        const postCount = await Post.countDocuments({
            username: decodedToken.username,
            status: "Active",
            createdAt: {
                $gte: new Date(new Date().getFullYear(), currentMonth, 1),
                $lt: new Date(new Date().getFullYear(), currentMonth + 1, 1)
            }
        });

        // Count the products of the user with status "Active" created in the current month
        const productCount = await Product.countDocuments({
            username: decodedToken.username,
            status: "Active",
            createdAt: {
                $gte: new Date(new Date().getFullYear(), currentMonth, 1),
                $lt: new Date(new Date().getFullYear(), currentMonth + 1, 1)
            }
        });

        let data = {};
        let postStatus = false;
        let productStatus = false;

        // Determine postStatus
        if (postCount >= 12) {
            postStatus = true;
        }

        // Determine productStatus
        if (productCount >= 12) {
            productStatus = true;
        }

        // Update user points in UserDetail model
        if (postStatus) {
            // Increment artistpoint by 1
            await UserDetail.updateOne({ username: decodedToken.username }, { $inc: { artistpoint: 1 } });
        }

        if (productStatus) {
            // Increment manufacturerpoint by 1
            await UserDetail.updateOne({ username: decodedToken.username }, { $inc: { manufacturerpoint: 1 } });
        }

        data = {
            post: {
                count: postCount,
                postStatus: postStatus
            },
            product: {
                count: productCount,
                productStatus: productStatus
            }
        };

        return NextResponse.json({
            success: true,
            data: data
        }, { status: 200 });
    } else {
        return NextResponse.json({
            msg: "Method Not Allowed"
        }, { status: 405 });
    }
}
