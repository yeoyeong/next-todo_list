import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";

async function getData(requestHeaders: any) {
  const res = await fetch("http://localhost:3000/api/user/1", {
    method: "GET",
    headers: requestHeaders,
    // cache: "no-store",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  // const session = useSession();
  const session = await getServerSession();

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  // requestHeaders.set("Authorization", data ? data.user.accessToken : "");
  requestHeaders.set("cache", "no-store");

  const data = await getData(requestHeaders);
  console.log(session);
  return <main></main>;
}
