var jwt = require('jsonwebtoken');
import User from "@/models/user"
import Notification from "@/models/notification"
import Transaction from "@/models/transaction"
import Wallet from "@/models/wallet"
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/middleware/mongoose";
import { sentMail } from "../../emailtemplate/templates";

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method === "POST") {
        const { fullName, ibannumber, withdrawAmount } = await req.json();
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

                    let user: any = await User.findOne({ "username": decodedToken.username })
                    let wallet = await Wallet.findOne({ "username": decodedToken.username })

                    if (!user) {
                        return NextResponse.json({
                            success: false,
                            msg: "Internal Server Error"
                        }, { status: 200 });
                    }

                    if (wallet.amount < withdrawAmount) {
                        return NextResponse.json({
                            success: false,
                            msg: `Withdrawal amount should not be more than wallet amount. You have ${wallet.amount} in wallet`
                        }, { status: 200 });
                    }
                    // New Amounts
                    let newWalletAmount = wallet.amount - withdrawAmount
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


                    remark = `Tranzacția de ${withdrawAmount} RON a fost finalizată cu succes. Sumă ${withdrawAmount} RON Credit prin numărul IBAN în 3 până la 5 zile lucrătoare`;

                    newTransaction = new Transaction({
                        transactionid: transactionid,
                        tousername: decodedToken.username,
                        amount: withdrawAmount,
                        type: "withdrawal",
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

                    // Add Transaction
                    await newTransaction.save();
                    // Update Wallet
                    await Wallet.findByIdAndUpdate(wallet._id, { amount: newWalletAmount });
                    // Add Notification
                    await notification.save();

                    await sentMail(decodedToken.username, 'withdraw.gym@gmail.com', "withdrawToAdmin", { holder: fullName, iban: ibannumber, money: withdrawAmount })

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