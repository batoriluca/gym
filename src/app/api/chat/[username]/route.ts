import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/middleware/mongoose";
const jwt = require('jsonwebtoken');
import ChatDetail from "@/models/chatdetail"
import Chats from "@/models/chat"

// UPDATE USER
export async function POST(req: NextRequest, { params }: any) {
    if (req.method == "POST") {
        const { msg } = await req.json();
        const { username } = params
        if (!username || username == "") {
            return NextResponse.json({
                success: false,
                msg: "invaild url"
            }, { status: 401 });
        }
        if (!msg || msg == "") {
            return NextResponse.json({
                success: false,
                msg: "invaild data"
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
            await connectDB();

            const user: any = await User.findOne({ "username": decodedToken.username })
            if (!user) {
                return NextResponse.json({
                    success: false,
                    msg: "Internal Server Error"
                }, { status: 200 });
            }

            const currentDate = new Date().toLocaleString('en-US', {
                day: 'numeric', month: 'short', year: '2-digit'
            })
            const currentTime2 = new Date().toLocaleString('en-US', {
                hour: 'numeric', minute: '2-digit', hour12: true
            })

            try {

                let chatdetailss = await ChatDetail.aggregate([
                    {
                        $match: {
                            $or: [
                                {
                                    "sender": username,
                                    "receiver": decodedToken.username
                                },
                                {
                                    "receiver": username,
                                    "sender": decodedToken.username
                                }
                            ]
                        }
                    }
                ]);

                if (chatdetailss.length !== 0) {
                    await ChatDetail.findByIdAndUpdate(chatdetailss[0]._id, {
                        lastmessage: msg,
                        lasttime: currentTime2,
                        lastdate: currentDate,
                    });

                    const newchat = new Chats({
                        chatid: chatdetailss[0].chatid,
                        username: decodedToken.username,
                        message: msg,
                        sentdate: currentDate,
                        senttime: currentTime2,
                    })
                    try {
                        await newchat.save();
                        return NextResponse.json({
                            success: true,
                            msg: "sent"
                        }, { status: 200 });
                    } catch (errd) {
                        console.log(errd)
                        return NextResponse.json({
                            success: false,
                            msg: "Internal Server Error"
                        }, { status: 200 });
                    }
                } else {
                    let chatid = "GYMCHID" + Math.floor(Math.random() * (99999 - 1111)) + 1;

                    const newchatDS = new ChatDetail({
                        chatid: chatid,
                        sender: decodedToken.username,
                        receiver: username,
                        lastmessage: msg,
                        lasttime: currentTime2,
                        lastdate: currentDate,
                    })
                    try {
                        await newchatDS.save();
                        const newchat = new Chats({
                            chatid: chatid,
                            username: decodedToken.username,
                            message: msg,
                            sentdate: currentDate,
                            senttime: currentTime2,
                        })

                        try {
                            await newchat.save();
                            return NextResponse.json({
                                success: true,
                                msg: "sent"
                            }, { status: 200 });
                        } catch (erdrd) {
                            console.log("4", erdrd)
                            return NextResponse.json({
                                success: false,
                                msg: "Internal Server Error"
                            }, { status: 200 });
                        }
                    } catch (errd) {
                        console.log("3", errd)
                        return NextResponse.json({
                            success: false,
                            msg: "Internal Server Error"
                        }, { status: 200 });
                    }
                }
            } catch (err) {
                console.log("2", err)
                return NextResponse.json({
                    success: false,
                    msg: "Internal Server Error"
                }, { status: 200 });
            }
        } catch (error) {
            console.log("1", error)
            // Handle token verification error
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

// Get USER
export async function GET(req: NextRequest, { params }: any) {
    if (req.method == "GET") {

        const { username } = params

        if (!username || username == "") {
            return NextResponse.json({
                success: false,
                msg: "invaild url"
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
            return NextResponse.json({
                success: false,
                msg: "Internal Server Error"
            }, { status: 200 });
        }

        let chatId: any = await ChatDetail.aggregate([
            {
                $match: {
                    $or: [
                        {
                            "sender": username,
                            "receiver": decodedToken.username
                        },
                        {
                            "receiver": username,
                            "sender": decodedToken.username
                        }
                    ]
                }
            }
        ]);

        if (chatId.length == 0) {
            return NextResponse.json({
                success: false,
                msg: "No chat Found",
                chats: [],
            }, { status: 200 });
        }

        let Chatss = await Chats.aggregate([
            {
                $match: {
                    'chatid': chatId[0].chatid,
                }
            },
            {
                $project: {
                    'username': 1,
                    'message': 1,
                    'sentdate': 1,
                    'senttime': 1,
                }
            }
        ]);

        if(decodedToken.username == chatId[0].sender){
            await ChatDetail.findByIdAndUpdate(chatId[0]._id, {
                seenmessage: {
                    sender: true,
                    // receiver: true,
                },
            });
        }
        
        if(decodedToken.username == chatId[0].receiver){
            await ChatDetail.findByIdAndUpdate(chatId[0]._id, {
                seenmessage: {
                    receiver: true,
                },
            });
        }


        if (Chatss.length == 0) {
            return NextResponse.json({
                success: false,
                msg: "No chat Found",
                chat: Chatss
            }, { status: 200 });
        }
        return NextResponse.json({
            success: true,
            chat: Chatss
        }, { status: 200 });

    } else {
        return NextResponse.json({
            msg: "Method Not Allowed"
        }, { status: 405 });
    }
}