import { verifyJwt } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const accessToken = request.headers.get("authorization");
  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(JSON.stringify({ error: "No Authorization" }), {
      status: 401,
    });
  }

  const url = new URL(request.url);
  let PatchId = url.searchParams.get("id"); // 파람즈의 patch 값을 가져옴
  const { state } = await request.json();
  console.log(state);
  const updatePosts = await prisma.todoBefore.update({
    where: {
      id: Number(PatchId),
    },
    data: {
      published: state,
    },
  });
  return new Response(JSON.stringify({ updatePosts }));
}
