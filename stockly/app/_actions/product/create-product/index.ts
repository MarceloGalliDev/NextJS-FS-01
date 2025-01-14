"use server";

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache";
import { createProductSchema, CreateProductSchema } from "./schema";


// aqui recebemos os inputs para criar o produto no banco de dados
// todas as funções aqui serão executadas no servidor e somente no servidor, mesmo que seja client component
export const createProduct = async (data: CreateProductSchema) => {
  createProductSchema.parse(data);
  await db.product.create({
    data,
  });
  revalidatePath("/products");
};