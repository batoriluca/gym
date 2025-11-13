// import { NextResponse, NextRequest } from 'next/server';
// import User from "@/models/user";
// import connectDB from "@/middleware/mongoose"
// const jwt = require('jsonwebtoken');

// export async function PATCH(req: NextRequest, res: NextResponse) {
//     if (req.method === "PATCH") {

//         const { currentpassword, newpassword, comfirmpassword } = await req.json();

//         const authorizationHeader = req.headers.get('authorization');
//         if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
//             const token = authorizationHeader.substring(7); // Removes "Bearer " from the beginning
//             try {
//                 const decodedToken = jwt.verify(token, process.env.JWTKEY);
//                 // Get the current time in seconds (Unix timestamp)
//                 const currentTime = Math.floor(Date.now() / 1000);
//                 const expirationTime = decodedToken.exp;
//                 if (expirationTime <= currentTime) {
//                     return NextResponse.json({
//                         success: false,
//                         msg: "Token has expired"
//                     }, { status: 401 });
//                 }

//                 try {
//                     await connectDB();
//                     const user = await User.findOne({ "email": decodedToken.email, "username": decodedToken.username });

//                     // Find User
//                     if (!user) {
//                         return NextResponse.json({ success: false, msg: "unauthorized access" }, { status: 401 });
//                     }

//                     try {
//                         const bytes = CryptoJS.AES.decrypt(user.password, process.env.JWTKEY as string);
//                         var decryptPassword = bytes.toString(CryptoJS.enc.Utf8);

//                         if (decryptPassword !== currentpassword) {
//                             return NextResponse.json({ sucess: false, msg: "vă rugăm să introduceți acreditări valide" }, { status: 200 });
//                         }

//                         if (newpassword !== comfirmpassword) {
//                             return NextResponse.json({ sucess: false, msg: "New and Comfirm Both password must be match" }, { status: 200 });
//                         }

//                         await User.findByIdAndUpdate(user._id, { password: CryptoJS.AES.encrypt(newpassword, process.env.JWTKEY as string).toString() });

//                         // Send the response with the new token and updated profile status
//                         return NextResponse.json({
//                             success: true,
//                         }, { status: 200 });

//                     } catch (err) {
//                         console.error(err);
//                         return NextResponse.json({ success: false, msg: "OPA...!, Acreditări nevalide" }, { status: 200 });
//                     }

//                 } catch (err) {
//                     return NextResponse.json({
//                         success: false,
//                         msg: "Internal Server Error"
//                     }, { status: 200 });
//                 }
//             } catch (error) {
//                 // Handle token verification error
//                 return NextResponse.json({
//                     success: false,
//                     msg: "unauthorized access"
//                 }, { status: 401 });
//             }
//         } else {
//             return NextResponse.json({
//                 success: false,
//                 msg: "unauthorized access"
//             }, { status: 401 });
//         }
//     } else {
//         return NextResponse.json({
//             msg: "Method Not Allowed"
//         }, { status: 405 });
//     }
// }


import { NextResponse, NextRequest } from 'next/server';
import User from '@/models/user';
import connectDB from '@/middleware/mongoose';
const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");

export async function PATCH(req: NextRequest, res: NextResponse) {
    if (req.method !== 'PATCH') {
        return NextResponse.json({ msg: 'Method Not Allowed' }, { status: 405 });
    }

    const { currentpassword, newpassword, comfirmpassword } = await req.json();
    if (!currentpassword || !newpassword || !comfirmpassword) {
        return NextResponse.json({ success: false, msg: 'Please enter mandatory credentials' }, { status: 200 });
    }
    if (currentpassword == "" || newpassword == "" || comfirmpassword == "") {
        return NextResponse.json({ success: false, msg: 'Please enter mandatory credentials' }, { status: 200 });
    }

    const authorizationHeader = req.headers.get('authorization');
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return NextResponse.json({ success: false, msg: 'unauthorized access' }, { status: 401 });
    }

    const token = authorizationHeader.substring(7); // Removes "Bearer " from the beginning
    try {
        const decodedToken = jwt.verify(token, process.env.JWTKEY);

        const currentTime = Math.floor(Date.now() / 1000);
        const expirationTime = decodedToken.exp;
        if (expirationTime <= currentTime) {
            return NextResponse.json({ success: false, msg: 'Token has expired' }, { status: 401 });
        }

        await connectDB();
        const user = await User.findOne({ email: decodedToken.email, username: decodedToken.username });

        if (!user) {
            return NextResponse.json({ success: false, msg: 'unauthorized access' }, { status: 401 });
        }

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.JWTKEY as string);
        const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedPassword !== currentpassword) {
            return NextResponse.json({ success: false, msg: 'Please enter valid credentials' }, { status: 200 });
        }

        if (newpassword !== comfirmpassword) {
            return NextResponse.json({ success: false, msg: 'New and Confirm passwords must match' }, { status: 200 });
        }

        await User.findByIdAndUpdate(user._id, {
            password: CryptoJS.AES.encrypt(newpassword, process.env.JWTKEY as string).toString()
        });

        return NextResponse.json({ success: true, msg: "Parola dvs. a fost schimbată" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, msg: 'Unauthorized access' }, { status: 401 });
    }
}
