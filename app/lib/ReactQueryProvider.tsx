"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, //refetchOnWindowFocus: 윈도우에 포커스가 되면 데이터를 다시 가져오는 것
      refetchOnMount: false, //refetchOnMount: DOM에 컴포넌트가 처음 생성되었을 때 데이터를 가져오는 것
    },
  },
});

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
