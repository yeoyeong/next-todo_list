import { verifyJwt } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const accessToken = request.headers.get("authorization");
  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(JSON.stringify({ error: "No Authorization" }), {
      status: 401,
    });
  }

  const id = Number(params.id);

  const userPosts = await prisma.todoBefore.findMany({
    where: {
      authorId: id,
    },
    include: {
      author: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });

  return new Response(JSON.stringify({ userPosts }));
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const accessToken = request.headers.get("authorization");
  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(JSON.stringify({ error: "No Authorization" }), {
      status: 401,
    });
  }

  const { value } = await request.json();

  const id = Number(params.id);
  const userPosts = await prisma.todoBefore.create({
    data: {
      title: value,
      published: false,
      authorId: id,
    },
  });

  return new Response(JSON.stringify({ userPosts }));
}

export async function DELETE(
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
  let deleteId = url.searchParams.get("delete");

  const deletePosts = await prisma.todoBefore.delete({
    where: {
      id: Number(deleteId),
    },
  });
  return new Response(JSON.stringify({ deletePosts }));
}

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
  let PatchId = url.searchParams.get("patch"); // 파람즈의 patch 값을 가져옴
  const { value } = await request.json();

  const patchPosts = await prisma.todoBefore.update({
    where: {
      id: Number(PatchId),
    },
    data: {
      title: value,
    },
  });
  return new Response(JSON.stringify({ patchPosts }));
}
