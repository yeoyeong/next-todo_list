import axios from "axios";

export const getTodoList = async (id: number, accessToken: string) => {
  //   console.log(key);
  //   console.log(accessToken);
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Accept", "application/json");
  requestHeaders.set("Authorization", accessToken ?? "");

  const res = await fetch(`http://localhost:3000/api/user/${id}`, {
    method: "GET",
    headers: requestHeaders,
    // cache: "no-store",
  }).then((res) => res.json());
  return res;
};
