import axios from "axios";

export const addTodoList = async (payload: any) => {
  console.log(payload);
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Accept", "application/json");
  requestHeaders.set("Authorization", payload.fetchData.accessToken);

  const res = await fetch(
    `http://localhost:3000/api/user/${payload.fetchData.id}`,
    {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({ value: payload.fetchData.value }),
      // cache: "no-store",
    }
  ).then((res) => res.json());
  return res;
  // const res = await fetch(
  //   `http://localhost:3000/api/user/1`,
  //   //   `${process.env.NEXTAUTH_URL}/api/user/${data.user.id}`,
  //   {
  //     method: "POST",
  //     headers: requestHeaders,
  //     body: JSON.stringify({ value }),
  //   }
  // )
  //   .then((res) => res.json())
};
