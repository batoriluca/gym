"use client"
import React from 'react';
import style from "@/styles/feed.module.css";
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Like from '@/components/like'
import { useSelector } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { PostDelete } from '@/function/post'

const Post = ({ postDetails, deleteOption = true }) => {
    const route = useRouter();

    const [deleteModel, setDeleteModel] = useState(false);
    const deletePost = () => {
        setDeleteModel(true)
    }
    const cancelDelete = () => {
        setDeleteModel(false)
    }
    const { userDetails } = useSelector((state) => state.auth);

    const confirmDelete = async () => {
        const deleteStatus = await PostDelete(postid)
        if (deleteStatus.success == true) {
            await toast.success(deleteStatus.msg)
            // await route.push(`/feed`);
            window.location.reload(true);
        } else {
            toast.error(deleteStatus.msg);
        }
    }

    let { _id, postid, username, user, textcontent, imagecontent, videocontent, likedBy, postdate, posttime } = postDetails;
    let { artistname, profilepic } = user;
    return (
        <div className={style.post} key={_id} style={{ backgroundImage: 'url(/img/cardshv2.png)', backgroundSize: 'cover' }}>
            
            <div className={style.user_detcontent}>
                <div className={style.user_details} onClick={() => { route.push(`/profile/${username}`) }}>
                    {profilepic == "" ? (
                        <div className={style.user_pic}>
                            <Image src="/img/osky1.jpg" alt={textcontent || "Not Found"} className={style.profileimg} height={100} width={100} />
                        </div>
                    ) : (<div className={style.user_pic}>
                        <Image src={`/artist_img/${profilepic || "osky1.jpg"}`} alt={textcontent || "Not Found"} className={style.profileimg} height={100} width={100} />
                    </div>)}
                    <div className={style.user_name}>{username}</div>
                </div>
                {/* {post.username == user.username ? (<i className="fa-solid fa-trash" id="deletePost" onClick={() => deletePost(post.postid)} post-id={post.postid}></i>) : null} */}
                {username == userDetails.username && deleteOption ? (<AiFillDelete id="deletePost" className={style.deletepost} post-id={postid} onClick={() => deletePost()} />) : null}
            </div>
            {imagecontent == "" ? null : (<div className={style.post_cont} ><Image src={`/posts/${imagecontent}`} alt={textcontent || "Not Found"} width={600} height={500} onClick={() => { route.push(`/feed/${postid}`) }} /></div>)}
            {videocontent == "" ? null : (<div className={style.post_contvid} ><video src={`/posts/${videocontent}`} controls loop muted preload="true" controlsList="nodownload" onClick={() => { route.push(`/feed/${postid}`) }} /></div>)}
            <div className={style.post_conttxt} >
                {textcontent == "" ? null : (<h3 onClick={() => { route.push(`/feed/${postid}`) }}>{textcontent}</h3>)}
                <Like postid={postid} likedBy={likedBy} username={userDetails.username} />
            </div>
            {deleteModel ? (<div className={style.warningcard} >
                <h2>ATENȚIE</h2>
                <i className="fa-solid fa-triangle-exclamation"></i>
                <h6>Doriți să ștergeți această postare?</h6>
                <p>Nu o veți putea recupera!</p>
                <div className="rowOp">
                    <button onClick={() => confirmDelete()}>Sunt sigur!</button>
                    <button onClick={() => cancelDelete()}>Înapoi</button>
                </div>
            </div>) : (null)}
        </div>
    );
};

export default Post;

export const PostType2 = ({ postDetails, deleteOption = true, user }) => {
    const route = useRouter();

    const [deleteModel, setDeleteModel] = useState(false);
    const deletePost = () => {
        setDeleteModel(true)
    }
    const cancelDelete = () => {
        setDeleteModel(false)
    }
    const { userDetails } = useSelector((state) => state.auth);

    const confirmDelete = async () => {
        const deleteStatus = await PostDelete(postid)
        if (deleteStatus.success == true) {
            await toast.success(deleteStatus.msg)
            // await route.push(`/feed`);
            window.location.reload(true);
        } else {
            toast.error(deleteStatus.msg);
        }
    }

    let { _id, postid, username, textcontent, imagecontent, videocontent, likedBy } = postDetails;
    let { artistname, profilepic } = user;

    return (
        <div className={style.post} key={_id} style={{ backgroundImage: 'url(/img/cardshv2.png)', backgroundSize: 'cover' }}>
            <div className={style.ch}></div>
            <div className={style.user_detcontent}>
                <div className={style.user_details} onClick={() => { route.push(`/profile/${username}`) }}>
                    {profilepic == "" ? (
                        <div className={style.user_pic}>
                            <Image src="/img/osky1.jpg" alt={textcontent || "Not Found"} className={style.profileimg} height={100} width={100} />
                        </div>
                    ) : (<div className={style.user_pic}>
                        <Image src={`/artist_img/${profilepic || "osky1.jpg"}`} alt={textcontent || "Not Found"} className={style.profileimg} height={100} width={100} />
                    </div>)}
                    <div className={style.user_name}>{artistname}</div>
                </div>
                {username == userDetails.username ? (<i className="fa-solid fa-trash" id="deletePost" onClick={() => deletePost(postid)} post-id={postid}></i>) : null}
                {username == userDetails.username && deleteOption ? (<AiFillDelete id="deletePost" post-id={postid} onClick={() => deletePost()} />) : null}
            </div>
            {imagecontent == "" ? null : (<div className={style.post_cont} ><Image src={`/posts/${imagecontent}`} alt={textcontent || "Not Found"} width={600} height={500} onClick={() => { route.push(`/feed/${postid}`) }} /></div>)}
            {videocontent == "" ? null : (<div className={style.post_contvid} ><video src={`/posts/${videocontent}`} controls loop muted preload="true" controlsList="nodownload" onClick={() => { route.push(`/feed/${postid}`) }} /></div>)}
            <div className={style.post_conttxt} >
                {textcontent == "" ? null : (<h3 onClick={() => { route.push(`/feed/${postid}`) }}>{textcontent}</h3>)}
                <Like postid={postid} likedBy={likedBy} username={userDetails.username} />
            </div>
            {deleteModel ? (<div className={style.warningcard}>
                <h2>ATENȚIE</h2>
                <i className="fa-solid fa-triangle-exclamation"></i>
                <h6>Sigur doriți să ștergeți această postare?</h6>
                <p>Nu o veți putea întoarce înapoi!</p>
                <div className="rowOp">
                    <button onClick={() => confirmDelete()}>Sunt sigur!</button>
                    <button onClick={() => cancelDelete()}>Înapoi</button>
                </div>
            </div>) : (null)}
        </div>
    );
}