"use client";
import { useSession } from "next-auth/react";
import SignInButton from "./components/SignInButton";
import { useEffect, useState } from "react";

export default function Home() {
  const { data } = useSession();
  // console.log(data.user.accessToken);
  const [userPosts, setUserPosts] = useState([]);
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  requestHeaders.set("Authorization", data ? data.user.accessToken : "");
  useEffect(() => {
    const todolist = async () => {
      if (!data) return;
      try {
        const res = await fetch(
          `http://localhost:3000/api/user/${data.user.id}`,
          {
            method: "GET",
            headers: requestHeaders,
          }
        ).then((res) => res.json());
        setUserPosts(res.userPosts);
      } catch (err: any) {
        console.log(err);
      }
    };
    todolist();
  }, [data]);

  if (userPosts) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <SignInButton />
        <div>
          {userPosts.map((el: any) => (
            <p key={el.id}>{el.title}</p>
          ))}
        </div>
      </main>
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignInButton />
    </main>
  );
}
