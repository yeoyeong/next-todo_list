"use client";
import { useAddTodoList } from "@/utils/queries/useAddTodoList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const WriteButton = () => {
  const { data } = useSession();
  const [value, setValue] = useState("");
  const { mutate: addTodoListMutation } = useAddTodoList();
  const router = useRouter();
  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const WriteHandler = async () => {
    if (!data) return;
    const fetchData: { value: string; id: number; accessToken: string } = {
      value,
      id: data.user.id,
      accessToken: data.user.accessToken,
    };
    dataFetchFnc(fetchData);
  };
  const dataFetchFnc = async (fetchData: {
    value: string;
    id: number;
    accessToken: string;
  }) => {
    if (!data) return;
    await addTodoListMutation(
      { fetchData },
      {
        onSuccess: () => {
          setValue("");
        },
      }
    );
  };
  // const requestHeaders: HeadersInit = new Headers();
  // requestHeaders.set("Accept", "application/json");
  // requestHeaders.set("Authorization", data ? data.user.accessToken : "");

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
  //   .then((result) => {
  //     router.refresh();
  //   });

  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
      <button onClick={WriteHandler}>만들기</button>
    </div>
  );
};

export default WriteButton;
