import { NextResponse, NextRequest } from 'next/server';
import User from "@/models/user";
import UserDetail from "@/models/userdetails";
import Wallet from "@/models/wallet";
import connectDB from "@/middleware/mongoose"
import { sentMail } from '@/app/api/emailtemplate/templates';
import { generateJwtToken, generatePassword } from '../../function/function';

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method === "POST") {
        try {
            const { username, email, password } = await req.json();
            if (username && email && password) {
                await connectDB()
                let verify_code = Math.floor(Math.random() * (9999 - 111)) + 1;
                let walletid = "GYMWAL" + Math.floor(Math.random() * (99999 - 1111)) + 1;

                // Check Username
                const usernameCheckUSER = await User.findOne({ username: username });
                const usernameCheckUSERDETAILS = await UserDetail.findOne({ username: username });
                const usernameCheckWALLET = await Wallet.findOne({ username: username });
                if (usernameCheckUSER || usernameCheckUSERDETAILS || usernameCheckWALLET) {
                    return NextResponse.json({ success: false, msg: "Acest nume de utilizator (" + username + ") există deja" }, { status: 200 });
                }

                // Check Email
                const emailCheckUSER = await User.findOne({ email: email });
                const emailCheckUSERDETAILS = await UserDetail.findOne({ email: email });
                const emailCheckWALLET = await Wallet.findOne({ email: email });
                if (emailCheckUSER || emailCheckUSERDETAILS || emailCheckWALLET) {
                    return NextResponse.json({ success: false, msg: "Acest e-mail (" + email + ") există deja" }, { status: 200 });
                }

                // Current Time Date
                const currentDate = new Date();
                const formattedcurrentDate = new Date().toLocaleString("en-CA", { day: "numeric", month: "short", year: "numeric" });
                const formattedcurrentTime = new Date().toLocaleString("en-CA", { hour: "numeric", minute: "2-digit", hour12: true });

                // Token
                var token = generateJwtToken({ email: email, username: username, profile_status: "Unverify", membership: "Pending" });

                const session = await User.db.startSession();
                session.startTransaction();

                try {
                    const uu = new User({
                        username: username,
                        email: email,
                        verify_code: verify_code,
                        password: generatePassword(password),
                        membership: "Pending",
                        token: token,
                        createAccOn: {
                            date: formattedcurrentDate,
                            time: formattedcurrentTime,
                            allTime: currentDate.getTime(),
                        },
                    });

                    const uudetails = new UserDetail({
                        username: username,
                        email: email,
                        manufacturerpoint: 1,
                        artistpoint: 1,
                        createAccOn: {
                            date: formattedcurrentDate,
                            time: formattedcurrentTime,
                            allTime: currentDate.getTime(),
                        },
                    });

                    const wallet = new Wallet({
                        walletid: walletid,
                        username: username,
                        amount: 0,
                    });

                    await uu.save({ session });
                    await uudetails.save({ session });
                    await wallet.save({ session });

                    await session.commitTransaction();
                    session.endSession();
                    let userDetailsR = {
                        username: username,
                        email: email
                    }
                    
                    // await sentMail(username, email, "createAccount");

                    return NextResponse.json({
                        success: true,
                        msg: "Contul dvs. a fost creat cu succes",
                        p: "Unverify",
                        m: "Pending",
                        t: token,
                        redirect: "emailverif",
                        userDetails: userDetailsR
                    }, { status: 200 });

                } catch (error: any) {
                    await session.abortTransaction();
                    session.endSession();
                    let msg = "ceva n-a mers bine";
                    console.log(error)
                    if (error.code === 11000) {
                        const field = Object.keys(error.keyValue)[0];
                        const value = error.keyValue[field];
                        msg = `${field} "${value}" există deja în evidențele noastre`;
                    }
                    return NextResponse.json({
                        success: false,
                        msg: msg,
                    }, { status: 200 });
                }
            } else {
                return NextResponse.json({
                    success: false,
                    msg: "Internal Server Error"
                }, { status: 500 });
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


