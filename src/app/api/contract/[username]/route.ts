import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/middleware/mongoose";
const jwt = require('jsonwebtoken');
import User from "@/models/user"
import Userdetails from "@/models/userdetails"
import Contract from "@/models/contract"
import ChatDetail from "@/models/chatdetail"
import Chats from "@/models/chat"
import Notification from "@/models/notification"
import Wallet from "@/models/wallet"
import Transaction from "@/models/transaction"
import Product from "@/models/product"

// Post POST
export async function POST(req: NextRequest, { params }: any) {

    if (req.method !== "POST") {
        return NextResponse.json({ msg: "Method Not Allowed" }, { status: 405 });
    }

    const { username } = params

    const { productid, productprice, deadline } = await req.json();

    if (!productid || productid == "" || !productprice || productprice == "" || !deadline || deadline == "" || !username || username == "") {
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
    const decodedToken = jwt.verify(token, process.env.JWTKEY);
    // Get the current time in seconds (Unix timestamp)
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = decodedToken.exp;
    if (expirationTime <= currentTime) {
        return NextResponse.json({ success: false, msg: "Token has expired" }, { status: 401 });
    }

    await connectDB();

    const user: any = await User.findOne({ "username": decodedToken.username })
    if (!user) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 200 });
    }

    const user2: any = await User.findOne({ "username": username })

    if (!user2) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 200 });
    }

    if (user2.profile_status == "Pending" || user2.profile_status == "Unverify") {
        return NextResponse.json({
            success: false,
            msg: "Internal Server Error"
        }, { status: 200 });
    }

    // Check sender product
    const senderProduct: any = await Product.findOne({ "productid": productid, "username": username })
    if (!senderProduct) {
        return NextResponse.json({
            success: false,
            msg: "invalid product"
        }, { status: 200 });
    }
    // Check sender user wallet
    let senderWallet = await Wallet.findOne({ "username": decodedToken.username })
    const numericProductPrice = parseFloat(productprice);

    // let receiverWallet = await Wallet.findOne({ "username": username })
    if (parseFloat(senderProduct.productPrice) !== numericProductPrice) {
        return NextResponse.json({ success: false, error: true, msg: "invalid price" }, { status: 200 });
    }

    if (parseFloat(senderWallet.amount) < parseFloat(senderProduct.productPrice)) {
        return NextResponse.json({ success: false, error: true, msg: "Nu aveți suficient echilibru în portofel" }, { status: 200 });
    }

    let walletamount = senderWallet.amount - numericProductPrice;
    let lamount = senderWallet.lockamount + numericProductPrice;

    // IDs
    let contractid = "GYMCHID" + Math.floor(Math.random() * (99999 - 1111)) + 1;
    let notifiid = "GYMNOT" + Math.floor(Math.random() * (99999 - 1111)) + 1;
    let transactionid = "GYMTRA" + Math.floor(Math.random() * (99999 - 1111)) + 1;

    // Current Time Date 
    const currentDate = new Date();
    // Current Date 
    const formattedcurrentDate = new Date().toLocaleString('en-CA', { day: 'numeric', month: 'short', year: 'numeric' })
    // Current Time 
    const formattedcurrentTime = new Date().toLocaleString('en-CA', { hour: 'numeric', minute: '2-digit', hour12: true })

    // Future Time Date (30 Days)
    let futureDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);

    if (deadline == "o-săptămână") {
        // Future Time Date (7 Days)
        futureDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    } else if (deadline == "două-săptămâni") {
        // Future Time Date (14 Days)
        futureDate = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    } else if (deadline == "o-lună") {
        // Future Time Date (30 Days)
        futureDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    }

    // Future Date
    const formattedFutureDate = futureDate.toLocaleString('en-CA', { day: 'numeric', month: 'short', year: 'numeric' });
    // Future Time
    const formattedFuturetime = futureDate.toLocaleString('en-CA', { hour: 'numeric', minute: '2-digit', hour12: true });

    // Deadline in words
    const formattedSlug = deadline.replace('-', ' ');

    // Remark for trascation 
    const remark = `${user.username} trimite contractul pentru a ${user2.username} suma de ${productprice} RON. Suma merge pe „sadasdas wallet locker. Chiria contractID #${contractid}`;
    // Msg for chats
    const mssg = `<i class="fas fa-file-signature" aria-hidden="true" style="position: inherit;"></i><a href="${process.env.URL}/contract/${contractid}">Contract nou.</a>`;
    // Notification Msg
    const notifimsg = `${user2.username} vrea să colaborați!.`

    // Trasaction 
    const transaction = new Transaction({
        transactionid: transactionid,
        fromusername: user.username,
        tousername: user2.username,
        amount: numericProductPrice,
        type: "lock",
        status: 'Active',
        remark: remark,
        senttime: {
            date: formattedcurrentDate,
            time: formattedcurrentTime,
        },
    })

    // Contract Details
    const contractdetail = new Contract({
        contractid: contractid,
        buyer: user.username,
        seller: user2.username,
        sellerproduct: productid,
        productprice: numericProductPrice,
        deadline: formattedSlug,
        senttime: {
            type1: currentDate,
            date: formattedcurrentDate,
            time: formattedcurrentTime,
        },
        delivertime: {
            type1: futureDate,
            date: formattedFutureDate,
            time: formattedFuturetime,
        }
    })

    // Notification
    const notification = new Notification({
        notifid: notifiid,
        forUser: user2.username,
        message: notifimsg,
        type: "contract",
        link: `${process.env.URL}/contract/${contractid}`,
        lasttime: formattedcurrentTime,
        lastdate: formattedcurrentDate
    })

    try {
        await contractdetail.save();
        await Wallet.findByIdAndUpdate(senderWallet._id,
            {
                amount: walletamount,
                lockamount: lamount,
                upatedate: formattedcurrentTime,
                updatetime: formattedcurrentDate
            }
        );
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

        // If Chat Details found
        if (chatdetailss) {
            await ChatDetail.findByIdAndUpdate(chatdetailss[0]._id, {
                lastmessage: "Contract nou",
                lasttime: formattedcurrentTime,
                lastdate: formattedFutureDate,
            });

            // Add Chat to chat details
            const newchat = new Chats({
                chatid: chatdetailss[0].chatid,
                username: user.username,
                type: 'contract',
                message: mssg,
                sentdate: formattedFutureDate,
                senttime: formattedcurrentTime,
            })

            await newchat.save();

        } else {
            let chatid = "GYMCHID" + Math.floor(Math.random() * (99999 - 1111)) + 1;
            const newchat = new ChatDetail({
                chatid: chatid,
                sender: user.username,
                receiver: user2.username,
                lastmessage: "Contract nou",
                lasttime: formattedcurrentTime,
                lastdate: formattedFutureDate,
            })
            await newchat.save();

            // Add Chat to chat details
            const newwchat = new Chats({
                chatid: chatid,
                username: user.username,
                type: 'contract',
                message: mssg,
                sentdate: formattedFutureDate,
                senttime: formattedcurrentTime,
            })

            await newwchat.save();
        }
        // Saving Collection
        await transaction.save();
        await notification.save();

        return NextResponse.json({ success: true, msg: "Contactul a fost trimis vânzătorului" }, { status: 200 });

    } catch (error) {
        // Handle token verification error
        console.log(error)
        return NextResponse.json({
            success: false,
            msg: "something went wrong"
        }, { status: 401 });
    }
}

// Post GET
export async function GET(req: NextRequest, { params }: any) {

    if (req.method !== "GET") {
        return NextResponse.json({ msg: "Method Not Allowed" }, { status: 405 });
    }

    const { username } = params

    if (!username || username == "") {
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
    const decodedToken = jwt.verify(token, process.env.JWTKEY);
    // // Get the current time in seconds (Unix timestamp)
    // const currentTime = Math.floor(Date.now() / 1000);
    // const expirationTime = decodedToken.exp;
    // if (expirationTime <= currentTime) {
    //     return NextResponse.json({ success: false, msg: "Token has expired" }, { status: 401 });
    // }

    await connectDB();

    const user: any = await User.findOne({ "username": decodedToken.username })
    if (!user) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 200 });
    }

    let contract = await Contract.aggregate([
        {
            $match: {
                contractid: username
            }
        },
        {
            $lookup: {
                from: 'userdetails',
                localField: 'buyer',
                foreignField: 'username',
                as: 'buyerd'
            }
        },
        {
            $unwind: '$buyerd'
        },
        {
            $lookup: {
                from: 'userdetails',
                localField: 'seller',
                foreignField: 'username',
                as: 'sellerd'
            }
        },
        {
            $unwind: '$sellerd'
        },
        {
            $lookup: {
                from: 'products',
                localField: 'sellerproduct',
                foreignField: 'productid',
                as: 'productd'
            }
        },
        {
            $unwind: '$productd'
        },
        {
            $project: {
                'buyerd._id': 1,
                'buyerd.artistname': 1,
                'buyerd.profilepic': 1,
                'sellerd._id': 1,
                'sellerd.artistname': 1,
                'sellerd.profilepic': 1,
                'productd._id': 1,
                'productd.username': 1,
                'productd.prodslug': 1,
                'productd.productTitle': 1,
                'productd.productCategory': 1,
                'productd.productPrice': 1,
                'productd.postdate': 1,
                'productd.posttime': 1,
                'productd.status': 1,
                '_id': 1,
                'contractid': 1,
                'buyer': 1,
                'seller': 1,
                'sellerproduct': 1,
                'productfile': 1,
                'deadline': 1,
                'status': 1,
                'senttime': 1,
                'delivertime': 1,
                'createdAt': 1,
                'updatedAt': 1,
            }
        }
    ]);

    if (contract.length > 0) {
        return NextResponse.json({ success: true, data: contract }, { status: 200 });
    }

    return NextResponse.json({ success: false, msg: "something went wrong", data: contract }, { status: 200 });
}

// Post PATCH
export async function PATCH(req: NextRequest, { params }: any) {

    if (req.method !== "PATCH") {
        return NextResponse.json({ msg: "Method Not Allowed" }, { status: 405 });
    }

    const { status, product, reviewRating, reviewTopic } = await req.json();

    const { username } = params

    if (!username || username == "") {
        return NextResponse.json({
            success: false,
            msg: "invaild data"
        }, { status: 401 });
    }
    if (!status || status == "") {
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
    const decodedToken = jwt.verify(token, process.env.JWTKEY);
    // // Get the current time in seconds (Unix timestamp)
    // const currentTime = Math.floor(Date.now() / 1000);
    // const expirationTime = decodedToken.exp;
    // if (expirationTime <= currentTime) {
    //     return NextResponse.json({ success: false, msg: "Token has expired" }, { status: 401 });
    // }

    await connectDB();

    const user: any = await User.findOne({ "username": decodedToken.username })
    if (!user) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 200 });
    }

    // Current Date 
    const formattedcurrentDate = new Date().toLocaleString('en-CA', {
        day: 'numeric', month: 'short', year: 'numeric'
    })
    // Current Time 
    const formattedcurrentTime = new Date().toLocaleString('en-CA', {
        hour: 'numeric', minute: '2-digit', hour12: true
    })

    let contractDetails = await Contract.findOne({ "contractid": username })

    if (status == "Expired") {
        await Contract.findByIdAndUpdate(contractDetails._id, { status: 'Expired' });
        let wallet = await Wallet.findOne({ "username": contractDetails.buyer })
        if (wallet) {
            let walletamount = wallet.amount + contractDetails.productprice;
            let lamount = wallet.lockamount - contractDetails.productprice;

            await Wallet.findByIdAndUpdate(wallet._id,
                {
                    amount: walletamount,
                    lockamount: lamount,
                    upatedate: formattedcurrentTime,
                    updatetime: formattedcurrentDate
                }
            );
        }
        return NextResponse.json({ success: true, msg: "Your contract has been updated" }, { status: 200 });
    }

    if (status == "Rejected") {
        await Contract.findByIdAndUpdate(contractDetails._id, { status: 'Rejected' });
        let wallet = await Wallet.findOne({ "username": contractDetails.buyer })
        if (wallet) {
            let walletamount = wallet.amount + contractDetails.productprice;
            let lamount = wallet.lockamount - contractDetails.productprice;

            await Wallet.findByIdAndUpdate(wallet._id,
                {
                    amount: walletamount,
                    lockamount: lamount,
                    upatedate: formattedcurrentTime,
                    updatetime: formattedcurrentDate
                }
            );
        }
        return NextResponse.json({ success: true, msg: "Your contract has been updated" }, { status: 200 });
    }

    if (status == "Accepted") {
        await Contract.findByIdAndUpdate(contractDetails._id, { status: 'Accepted' });
        return NextResponse.json({ success: true, msg: "Your contract has been updated" }, { status: 200 });
    }

    if (status == "Delivered") {
        if (!product || product == "") {
            return NextResponse.json({
                success: false,
                msg: "invaild data"
            }, { status: 200 });
        }
        let buyerWallet = await Wallet.findOne({ "username": contractDetails.buyer })
        let sellerWallet = await Wallet.findOne({ "username": contractDetails.seller })
        if (buyerWallet) {
            let walletamount = buyerWallet.amount;
            let lamount = await buyerWallet.lockamount - contractDetails.productprice;

            await Wallet.findByIdAndUpdate(buyerWallet._id,
                {
                    amount: walletamount,
                    lockamount: lamount,
                    upatedate: formattedcurrentTime,
                    updatetime: formattedcurrentDate
                }
            );
        }
        if (sellerWallet) {
            let walletamount = sellerWallet.amount;
            let lamount = await sellerWallet.lockamount + contractDetails.productprice;

            await Wallet.findByIdAndUpdate(sellerWallet._id,
                {
                    amount: walletamount,
                    lockamount: lamount,
                    upatedate: formattedcurrentTime,
                    updatetime: formattedcurrentDate
                }
            );
        }

        await Contract.findByIdAndUpdate(contractDetails._id, { status: 'Delivered', productfile: product });
        return NextResponse.json({ success: true, msg: "Your contract has been updated" }, { status: 200 });
    }

    if (status == "Closed") {
        if (!reviewRating || reviewRating == "") {
            return NextResponse.json({
                success: false,
                msg: "invaild data"
            }, { status: 200 });
        }
        await Contract.findByIdAndUpdate(contractDetails._id, {
            status: 'Closed',
            delivertime: {
                review: reviewTopic,
                rating: reviewRating,
                downloaded: true,
                // time: {
                //     date: formattedcurrentDate,
                //     time: formattedcurrentTime,
                // },
            }
        });
        return NextResponse.json({ success: true, msg: "Your contract has been updated" }, { status: 200 });
    }

    return NextResponse.json({ success: false, msg: "something went wrong" }, { status: 200 });
}