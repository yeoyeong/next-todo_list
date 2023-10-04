"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="space-x-10">
        <button
          className="rounded-xl border bg-red-300 px-12 py-4"
          onClick={() => signOut()}
        >
          Log Out
        </button>
      </div>
    );
  }
  return (
    <div className="space-x-10">
      <button
        className="rounded-xl border bg-yellow-300 px-12 py-4"
        onClick={() => signIn()}
      >
        LogIn
      </button>
    </div>
  );
};

export default SignInButton;
