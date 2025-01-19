"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { deleteSaleSchema, DeleteSaleSchema } from "./schema";

export const deleteSale = async (data: DeleteSaleSchema) => {
  deleteSaleSchema.parse(data);
  
  await db.$transaction(async (trx) => {
    await trx.sale.delete({
      where: {
        id: data.id
      }
    });
  });
  revalidatePath("/sales")
}