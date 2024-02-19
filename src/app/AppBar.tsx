import Link from "next/link";
import React from "react";
import LoginButton from "./LoginButton";
import "./globals.css";
import { FaSearch } from "react-icons/fa";

const AppBar = () => {
  return (
    <div className="bg-gradient-to-br from-peach-light to-peach-dark p-2 flex gap-5 ">
      <FaSearch style={{color: '#16537e', marginTop:'4px'}}/>
      <Link href={"/"} className="text-blu-dark mx-[-12px] font-bold ">Fridge Finds</Link>
      <LoginButton />
    </div>
  );
};

export default AppBar;