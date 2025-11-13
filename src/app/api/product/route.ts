import Product from "@/models/product"
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
        let products = [];
        // Get the query string from the request URL
        const queryString = req.url.split('?')[1]; // Get the part after the '?'
        // Parse the query string into a URLSearchParams object
        const params = new URLSearchParams(queryString);
        // Get the value of the 'search' parameter
        const searchValue = params.get('search');

        if (searchValue && searchValue !== "" && searchValue !== "all") {

            products = await Product.aggregate([
                {
                    $match: {
                        "productCategory": searchValue,
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
                        'productid': 1,
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

        } else {
            products = await Product.aggregate([
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
                        'productid': 1,
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
        }


        if (products) {
            return NextResponse.json({
                success: true,
                data: products
            }, { status: 200 });
        }
        return NextResponse.json({
            msg: "Something went wrong",
            success: false,
            data: products
        }, { status: 200 });

    } else {
        return NextResponse.json({
            msg: "Method Not Allowed"
        }, { status: 405 });
    }
}

// Post POST
export async function POST(req: NextRequest, res: NextResponse) {

    const { title, category, price, description, image1, image2, video } = await req.json();
    if (title == "" || category == "" || price == "" || description == "" || image1 == "" || image2 == "" || video == "") {
        return NextResponse.json({ success: false, msg: "Something went wrong" }, { status: 200 });
    }

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

    const convertToSlug = async (text: any) => {
        return text
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }

    let productSlug = await Product.findOne({ "prodslug": await convertToSlug(title) })

    if (productSlug) {
        productSlug = await convertToSlug(title) + Math.floor(Math.random() * (1 - 99)) + 1;
    } else {
        productSlug = await convertToSlug(title)
    }

    let productid = "GPOID" + Math.floor(Math.random() * (99999 - 1111)) + 1;

    const currentDate = new Date().toLocaleString('en-US', { day: 'numeric', month: 'short', year: '2-digit' })
    const currentTime2 = new Date().toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

    const newproduct = new Product({
        productid: productid,
        username: decodedToken.username,
        prodslug: productSlug,
        productTitle: title,
        productCategory: category,
        productPrice: price,
        productDescription: description,
        image1: image1,
        image2: image2,
        video: video,
        status: "Active",
        postdate: currentDate,
        posttime: currentTime2,
    })


    await newproduct.save();

    return NextResponse.json({ success: true, msg: "Your product has been uploaded" }, { status: 200 });
}