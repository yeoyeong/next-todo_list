import axios from "axios";

export const deleteTodoList = async (payload: any) => {
  console.log(payload);
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Accept", "application/json");
  requestHeaders.set("Authorization", payload.fetchData.accessToken);

  const res = await fetch(
    `http://localhost:3000/api/user/${payload.fetchData.id}?delete=${payload.fetchData.postId}`,
    {
      method: "DELETE",
      headers: requestHeaders,
      // cache: "no-store",
    }
  ).then((res) => res.json());
  return res;
};
