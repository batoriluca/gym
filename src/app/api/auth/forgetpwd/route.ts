import { NextResponse, NextRequest } from 'next/server';
import User from "@/models/user";
import UserDetail from "@/models/userdetails";
import Wallet from "@/models/wallet";
import connectDB from "@/middleware/mongoose"
import { sentMail } from '@/app/api/emailtemplate/templates';
const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");
import nodemailer from "nodemailer";

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method === "POST") {
        try {
            await connectDB()
            const { fuction, username, verify_code, password } = await req.json();
            if (!fuction || !username) {
                return NextResponse.json({
                    success: false,
                    msg: "Invaild Data"
                }, { status: 200 });
            }

            if (fuction == "finduser") {
                if (username && username !== "" && username !== " ") {
                    let User = await UserDetail.findOne({ $or: [{ email: username }, { username: username }] })
                    if (User) {
                        let userdetial = {
                            username: User.username,
                            email: User.email,
                            artistname: User.artistname,
                            profilepic: User.profilepic,
                        }
                        return NextResponse.json({ success: true, msg: "Detalii găsite", userdetail: userdetial }, { status: 200 });
                    } else {
                        return NextResponse.json({ success: false, msg: "Nu a fost găsit niciun utilizator " }, { status: 200 });
                    }
                } else {
                    return NextResponse.json({ success: false, msg: "vă rugăm să completați toate câmpurile obligatorii" }, { status: 200 });
                }
            }

            if (fuction == "sendemail") {
                if (username && username !== "" && username !== " ") {
                    let User = await UserDetail.findOne({ $or: [{ email: username }, { username: username }] })
                    if (User) {
                        let verify_code = "52222";
                        await UserDetail.findByIdAndUpdate(User._id, { verify_code: verify_code });
                        // var transporter = nodemailer.createTransport({
                        //     host: "mail.growyourmusic.ro", // i forget to change this wait 
                        //     port: 465,
                        //     secure: true,
                        //     auth: {
                        //         user: 'demo@growyourmusic.ro', // Here is the mail account username
                        //         pass: 'GrowYourMus1crn$'  // here is the password
                        //     }
                        // });
                        // var mailOptions = {
                        //     from: 'demo@growyourmusic.ro', // here the mail account which written up (user)
                        //     to: User.email, // here is the user mail account for comfimation otp/code like google and others
                        //     bcc: 'workwithaashuu@gmail.com, luca.batori.info@gmail.com',
                        //     subject: 'Codul tău de verificare pentru GrowYourMusic România',
                        //     text: verify_code,
                        // };
                        // transporter.sendMail(mailOptions);
                        return NextResponse.json({ success: true, msg: "codul de verificare a fost trimis" }, { status: 200 });
                    } else {
                        return NextResponse.json({ success: false, msg: "Nu a fost găsit niciun utilizator" }, { status: 200 });
                    }
                } else {
                    return NextResponse.json({ success: false, msg: "vă rugăm să completați toate câmpurile obligatorii" }, { status: 200 });
                }
            }

            if (fuction == "verifycode") {
                if (username && username !== "" && username !== " " || verify_code) {
                    let User = await UserDetail.findOne({ $or: [{ email: username }, { username: username }] })
                    if (User) {
                        if (verify_code == User.verify_code) {
                            return NextResponse.json({ success: true, msg: "Codul de verificare este corect" }, { status: 200 });
                        } else {
                            return NextResponse.json({ success: false, msg: "va rugam sa introduceti codul de verificare" }, { status: 200 });
                        }
                    } else {
                        return NextResponse.json({ success: false, msg: "Nu a fost găsit niciun utilizator" }, { status: 200 });
                    }
                } else {
                    return NextResponse.json({ success: false, msg: "vă rugăm să completați toate câmpurile obligatorii" }, { status: 200 });
                }
            }
            if (fuction == "newpassword") {
                if (username && username !== "" && username !== " " || password) {
                    let user = await User.findOne({ $or: [{ email: username }, { username: username }] })
                    if (user) {
                        User.findByIdAndUpdate(user._id, { password: CryptoJS.AES.encrypt(password, process.env.JWTKEY as string).toString() });
                        return NextResponse.json({ success: true, msg: "Parola dvs. a fost schimbată" }, { status: 200 });
                    }
                } else {
                    return NextResponse.json({ success: false, msg: "Ceva n-a mers bine" }, { status: 200 });
                }
            } else {
                return NextResponse.json({ success: false, msg: "vă rugăm să completați toate câmpurile obligatorii" }, { status: 200 });
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


