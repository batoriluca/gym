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
                    let user: any = await User.findOne({ "username": decodedToken.username })
                    let wallet = await Wallet.findOne({ "username": decodedToken.username })

                    if (!user) {
                        return NextResponse.json({
                            success: false,
                            msg: "Internal Server Error"
                        }, { status: 200 });
                    }

                    let walletamount = wallet.amount;
                    let walletlockamount = wallet.lockamount;
                    let amount = (paymentIntent.amount / 100) * 8 / 100;
                    amount = (paymentIntent.amount / 100) - amount;


                    // 86400000 / 1000 / 60 / 60 / 24 === 1 Day
                    // Current Time Date 
                    const currentDate = new Date();
                    // formatted Current Date 
                    const formattedcurrentDate = new Date().toLocaleString('en-CA', { day: 'numeric', month: 'short', year: 'numeric' })
                    // formatted Current Time 
                    const formattedcurrentTime = new Date().toLocaleString('en-CA', { hour: 'numeric', minute: '2-digit', hour12: true })

                    // Notofication ID 
                    let notifiid = "GYMNOT" + Math.floor(Math.random() * (99999 - 1111)) + 1;
                    // Transaction ID 
                    let transactionid = "GYMTRA" + Math.floor(Math.random() * (99999 - 1111)) + 1;
                    let remark;
                    let newTransaction;
                    let notification;
                    let redirect;
                    let success;


                    if (payment_status == "succeeded") {
                        remark = `Tranzacția de ${amount} RON este realizată cu succes. Suma ${amount} RON Credit in Portofelul GYM`;

                        if (wallet) {
                            walletamount = wallet.amount + amount;
                        }

                        newTransaction = new Transaction({
                            transactionid: transactionid,
                            tousername: decodedToken.username,
                            amount: amount,
                            type: "add",
                            status: 'Active',
                            remark: remark,
                            senttime: {
                                date: formattedcurrentDate,
                                time: formattedcurrentTime,
                            },
                        })

                        notification = new Notification({
                            notifid: notifiid,
                            forUser: decodedToken.username,
                            message: remark,
                            lasttime: formattedcurrentTime,
                            lastdate: formattedcurrentDate
                        })

                        success = true;
                        redirect = 'paymentsuccess';

                    } else if (payment_status == "processing") {
                        remark = `Tranzacția de ${amount} de lei este în așteptare. Suma de ${amount} RON este blocată în portofelul de la sală.`;
                        if (wallet) {
                            walletlockamount = wallet.lockamount + amount;
                        }

                        newTransaction = new Transaction({
                            transactionid: transactionid,
                            tousername: decodedToken.username,
                            amount: amount,
                            type: "lock",
                            status: 'Active',
                            remark: remark,
                            senttime: {
                                date: formattedcurrentDate,
                                time: formattedcurrentTime,
                            },
                        })

                        notification = new Notification({
                            notifid: notifiid,
                            forUser: decodedToken.username,
                            message: remark,
                            lasttime: formattedcurrentTime,
                            lastdate: formattedcurrentDate
                        })

                        success = true;
                        redirect = 'paymentprocessing';
                    } else {
                        // If Payment Failed

                        remark = `Tranzacția de ${amount} RON a eșuat.`;

                        newTransaction = new Transaction({
                            transactionid: transactionid,
                            tousername: decodedToken.username,
                            amount: amount,
                            type: "fail",
                            status: 'Active',
                            remark: remark,
                            senttime: {
                                date: formattedcurrentDate,
                                time: formattedcurrentTime,
                            },
                        })
                        notification = new Notification({
                            notifid: notifiid,
                            receiver: decodedToken.username,
                            message: remark,
                            lasttime: formattedcurrentTime,
                            lastdate: formattedcurrentDate
                        })
                        success = false;
                        redirect = 'paymentfailed';
                    }

                    // Add Transaction
                    await newTransaction.save();
                    // Update Wallet
                    await Wallet.findByIdAndUpdate(wallet._id, { amount: walletamount, lockamount: walletlockamount, stripePaymentID: '' });
                    // Add Notification
                    await notification.save();

                    return NextResponse.json({
                        success: success,
                        msg: remark,
                        redirect: redirect,
                    }, { status: 200 });

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