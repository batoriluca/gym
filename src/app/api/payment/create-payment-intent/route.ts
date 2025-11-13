import Wallet from "@/models/wallet"
import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/middleware/mongoose";
const stripe = require("stripe")(process.env.STRIPEPVTKEY as string);
const jwt = require('jsonwebtoken');

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method === "POST") {
        const { amount } = await req.json() || 50;
        if (amount >= 50) {
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
                        const user = await User.findOne({ "email": decodedToken.email, "username": decodedToken.username });
                        let wallet = await Wallet.findOne({ "username": decodedToken.username })
                        // Find User
                        if (!user) {
                            return NextResponse.json({ success: false, msg: "unauthorized access" }, { status: 200 });
                        }

                        let customer;
                        let paymentIntent;
                        let amount2 = amount * 100;
                        if (wallet.stripecsID == '') {
                            customer = await stripe.customers.create({
                                name: user.artistname,
                                email: user.email,
                            });
                            await Wallet.findByIdAndUpdate(wallet._id, { stripecsID: customer.id });
                        } else {
                            customer = await stripe.customers.retrieve(wallet.stripecsID);
                        }
                        
                        if (wallet.stripePaymentID == '') {
                            // Create a PaymentIntent with the order amount and currency
                            paymentIntent = await stripe.paymentIntents.create({
                                // customer: "cus_NaJKtAPfFHg76a",
                                customer: customer.id,
                                setup_future_usage: "on_session",
                                amount: amount2,
                                currency: "ron",
                                payment_method_types: ['card'], // Add the payment method types you want to support
                                // automatic_payment_methods: {
                                //     enabled: true,
                                // },
                            });
                            await Wallet.findByIdAndUpdate(wallet._id, { stripePaymentID: paymentIntent.id });
                        } else {
                            paymentIntent = await stripe.paymentIntents.retrieve(wallet.stripePaymentID);
                            if (paymentIntent) {
                                await stripe.paymentIntents.update(wallet.stripePaymentID, {
                                    amount: amount2,
                                });
                                paymentIntent = await stripe.paymentIntents.retrieve(wallet.stripePaymentID);
                            } else {
                                // Create a PaymentIntent with the order amount and currency
                                paymentIntent = await stripe.paymentIntents.create({
                                    // customer: "cus_NaJKtAPfFHg76a",
                                    customer: customer.id,
                                    setup_future_usage: "on_session",
                                    amount: amount2,
                                    currency: "ron",
                                    payment_method_types: ['card'], // Add the payment method types you want to support
                                    // automatic_payment_methods: {
                                    //     enabled: true,
                                    // },
                                });
                                await Wallet.findByIdAndUpdate(wallet._id, { stripePaymentID: paymentIntent.id });
                            }
                        }

                        return NextResponse.json({
                            success: true,
                            clientSecret: paymentIntent.client_secret
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
                success: false,
                msg: "Internal Server Error"
            }, { status: 200 });
        }

    } else {
        return NextResponse.json({
            msg: "Method Not Allowed"
        }, { status: 405 });
    }
}