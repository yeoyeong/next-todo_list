import axios from "axios";

export const patchTodoList = async (payload: any) => {
  console.log(payload);
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Accept", "application/json");
  requestHeaders.set("Authorization", payload.fetchData.accessToken);

  const res = await fetch(
    `http://localhost:3000/api/user/${payload.fetchData.id}?patch=${payload.fetchData.postId}`,
    {
      method: "PATCH",
      headers: requestHeaders,
      body: JSON.stringify({ value: payload.fetchData.value }),
      // cache: "no-store",
    }
  ).then((res) => res.json());
  return res;
};
