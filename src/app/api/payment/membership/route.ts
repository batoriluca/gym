var jwt = require('jsonwebtoken');
import User from "@/models/user"
import Userdetails from "@/models/userdetails"
import Notification from "@/models/notification"
import Transaction from "@/models/transaction"
import Wallet from "@/models/wallet"
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/middleware/mongoose";
const stripe = require("stripe")(process.env.STRIPEPVTKEY as string);

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method === "POST") {
        const { payment_intent, payment_status } = await req.json();
        const authorizationHeader = req.headers.get('authorization');
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
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

                try {
                    await connectDB();
                    let paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

                    if (!paymentIntent) {
                        return NextResponse.json({
                            success: false,
                            msg: "Internal Server Error"
                        }, { status: 200 });
                    }
                    if (payment_status !== "succeeded") {
                        return NextResponse.json({
                            success: false,
                            msg: "Payment is not done"
                        }, { status: 200 });
                    }
                    let user: any = await User.findOne({ "username": decodedToken.username })
                    let wallet = await Wallet.findOne({ "username": decodedToken.username })
                    let userdetails = await Userdetails.findOne({ "username": decodedToken.username })
                    if (!user) {
                        return NextResponse.json({
                            success: false,
                            msg: "Internal Server Error"
                        }, { status: 200 });
                    }

                    const session = await User.db.startSession();
                    session.startTransaction();

                    // 86400000 / 1000 / 60 / 60 / 24 === 1 Day
                    // Current Time Date 
                    const currentDate = new Date();
                    // formatted Current Date 
                    const formattedcurrentDate = new Date().toLocaleString('en-CA', { day: 'numeric', month: 'short', year: 'numeric' })
                    // formatted Current Time 
                    const formattedcurrentTime = new Date().toLocaleString('en-CA', { hour: 'numeric', minute: '2-digit', hour12: true })

                    // Future Time Date (30 Days)
                    let futureDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
                    // Formatted Future Date
                    let formattedFutureDate = futureDate.toLocaleString('en-CA', { day: 'numeric', month: 'short', year: 'numeric' });
                    // Formatted Future Time
                    let formattedFutureTime = futureDate.toLocaleString('en-CA', { hour: 'numeric', minute: '2-digit', hour12: true });

                    // Notofication ID 
                    let notifiid = "GYMNOT" + Math.floor(Math.random() * (99999 - 1111)) + 1;
                    // Transaction ID 
                    let transactionid = "GYMTRA" + Math.floor(Math.random() * (99999 - 1111)) + 1;

                    const remark = `${user.username} achiziționează calitatea de membru. Calitatea de membru este activă până la ${formattedFutureDate}`;
                    const count = await User.countDocuments();
                    if (count < 501) {

                        // Future Time Date (7 Days)
                        futureDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
                        // Formatted Future Date
                        formattedFutureDate = futureDate.toLocaleString('en-CA', { day: 'numeric', month: 'short', year: 'numeric' });
                        // Formatted Future Time
                        formattedFutureTime = futureDate.toLocaleString('en-CA', { hour: 'numeric', minute: '2-digit', hour12: true });

                    }

                    const newTransaction = new Transaction({
                        transactionid: transactionid,
                        tousername: user.username,
                        amount: 50,
                        type: "Membership",
                        status: 'Active',
                        remark: remark,
                        senttime: {
                            date: formattedcurrentDate,
                            time: formattedcurrentTime,
                        },
                    })

                    const notification = new Notification({
                        notifid: notifiid,
                        forUser: user.username,
                        message: remark,
                        lasttime: formattedcurrentTime,
                        lastdate: formattedcurrentDate
                    })
                    try {

                        await User.findByIdAndUpdate(user._id, {
                            membership: "Active",
                            expireAccOn: {
                                date: formattedFutureDate,
                                time: formattedFutureTime,
                                allTime: futureDate,
                            },
                        });

                        await Wallet.findByIdAndUpdate(wallet._id, { stripePaymentID: '' });
                        await Userdetails.findByIdAndUpdate(userdetails._id, {
                            expireAccOn: {
                                date: formattedFutureDate,
                                time: formattedFutureTime,
                                allTime: futureDate,
                            },
                        });
                        await notification.save({ session });
                        await newTransaction.save({ session });
                        await session.commitTransaction();
                        session.endSession();
                        // Token
                        var newtoken = jwt.sign({ email: decodedToken.email, username: decodedToken.username, profile_status: user.profile_status, membership: "Active" }, process.env.JWTKEY, { expiresIn: "1h" });

                        return NextResponse.json({
                            success: true,
                            msg: "Contul dvs. a fost activ",
                            m: "Active",
                            t: newtoken,
                            redirect: "setupacc",
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