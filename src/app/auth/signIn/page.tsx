"use client";
import Button from "@elements/Button";
import TextBox from "@elements/TextBox";
import { signIn } from "next-auth/react";
import React, { useRef } from "react";

const LoginPage = () => {
  const userName = useRef("");
  const pass = useRef("");

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      username: userName.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "/",
    });
  };
  
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br gap-1 from-peach-light to-peach-dark">
      <h1 className="text-3xl font-bold text-blu-dark whitespace-nowrap mb-12">Sign in to save your recipes!</h1>
  
      <div className="px-7 py-4 shadow bg-gray-100 rounded-md flex flex-col gap-2 w-96">
        <TextBox
          labelText="User Name"
          onChange={(e) => (userName.current = e.target.value)}
          className="text-blu-dark"
        />
        <TextBox
          labelText="Password"
          type={"password"}
          onChange={(e) => (pass.current = e.target.value)}
          className="text-blu-dark"
        />
        <Button onClick={onSubmit} style={{ color: '#16537e', backgroundColor: 'white' }}>Login</Button>
  
        {/* Register new account option */}
        <button
          disabled={true} // Disable the button for now
          className="text-sm text-gray-500 cursor-not-allowed"
        >
          Register a new account
        </button>
      </div>
  
      {/* Embedded Giphy content */}
      <iframe
        src="https://giphy.com/embed/N23cG6apipMmQ"
        width="200"
        height="302"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      ></iframe>
      <p className="text-xs mt-[-80px]">
        <a href="https://giphy.com/gifs/spongebob-spongebob-squarepants-nickelodeon-nye-N23cG6apipMmQ">via GIPHY</a>
      </p>
    </div>
  );
};

export default LoginPage;