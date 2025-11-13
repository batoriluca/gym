import React from "react";
import style from "../styles/navbar.module.css";
import Link from "next/link";
import Script from "next/script";
import { BsFillGearFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { FaRegPlusSquare, FaCommentDollar } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { IoMdTrophy } from "react-icons/io";
import Image from 'next/image'

const navbar = () => {
  return (
    <>
      <Script
        src="https://kit.fontawesome.com/68c6324e4e.js"
        crossOrigin="anonymous"
      />
      <div className={style.navbar}>
        <div className={style.navbar_title}>
          <div className={style.socialmed}>
            <Image src="/img/Group_1.png" alt="" width={40} height={40} />
            <i className="fa-brands fa-instagram" />
            <i className="fa-brands fa-youtube" />
            <i className="fa-brands fa-tiktok" />
          </div>
        </div>
        <div className={style.menu_box}>
          <div className={style.menu}>
            <menu>
              <ul>
                <Link className={style.a_link} href={`${process.env.URL}/feed`}>
                  <li className="li_menu">
                    <AiFillHome className={style.i} />
                    <h4>Acas&#259;</h4>
                  </li>
                </Link>
                <Link className={style.a_link} href={`${process.env.URL}/createnew`}>
                  <li>
                    <FaRegPlusSquare className={style.i} />
                    <h4>Postare nou&#259;</h4>
                  </li>
                </Link>
                <Link className={style.a_link} href={`${process.env.URL}/shop`}>
                  <li>
                    <MdShoppingCart className={style.i} />
                    <h4>Magazin</h4>
                  </li>
                </Link>
                <Link className={style.a_link} href={`${process.env.URL}/chat`}>
                  <li>
                    <FaCommentDollar className={style.i} />
                    <h4>Mesaje</h4>
                  </li>
                </Link>
                <Link className={style.a_link} href={`${process.env.URL}/leaderboard`}>
                  <li>
                    <IoMdTrophy className={style.i} />
                    <h4>Clasament</h4>
                  </li>
                </Link>
                <Link className={style.a_link} href={`${process.env.URL}/settings`}>
                  <li>
                    <BsFillGearFill className={style.i} />
                    <h4>Set&#259;ri</h4>
                  </li>
                </Link>
              </ul>
            </menu>
          </div>
        </div>
      </div>
    </>
  );
};

export default navbar;
