"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { upsertProductSchema, UpsertProductSchema } from "./schema";

// aqui recebemos os inputs para criar o produto no banco de dados
// todas as funções aqui serão executadas no servidor e somente no servidor, mesmo que seja client component
export const upsertProduct = async (data: UpsertProductSchema) => {
  upsertProductSchema.parse(data);
  await db.product.upsert({
    where: { id: data.id ?? "" },
    create: data,
    update: data,
  });
  revalidatePath("/products");
  revalidatePath("/");
  // aqui usamos a tag vindo la do data-access
  revalidateTag("get-products");
};
