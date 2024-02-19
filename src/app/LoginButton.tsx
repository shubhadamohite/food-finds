"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const LoginButton = () => {
  const { data: session } = useSession();
  return (
    <div className="ml-auto flex gap-2">
      {session?.user ? (
        <>
          <p className="text-blu-dark font-bold"> {session.user.name}</p>
          <button className="text-red-dark font-semibold" onClick={() => signOut()}>
            Sign Out
          </button>
        </>
      ) : (
        <button className="text-blu-dark" onClick={() => signIn()}>
          Sign In
        </button>
      )}
    </div>
  );
};

export default LoginButton;