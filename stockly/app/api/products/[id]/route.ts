// usamos para capturar os params da rota
// o params que é recebido pelas funções tem que ser o mesmo nome da pasta

import { db } from "@/app/_lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  // request: Request,
  request: NextRequest,
  {params}: {params: {id: string}} // o id aqui é devido o nome da pasta
) {
  // aqui abaixo estamos trabalhando com o query params, o query corresponde ao nome do parametro na query params
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  console.log(query);

  // aqui abaixo estamos trabalhando com o id que é o mesmo nome da pasta
  const productId = params.id;
  const product = await db.product.findUnique({
    where: {
      id: productId
    }
  });
  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }
  return Response.json(product, { status: 200 });
}

export async function DELETE(
  request: Request,
  {params}: {params: {id: string}}
) {
  await db.product.delete({
    where: {
      id: params.id,
    }
  });
  return Response.json({}, { status: 200 });
}