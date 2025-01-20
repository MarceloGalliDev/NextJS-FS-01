"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { deleteSaleSchema, DeleteSaleSchema } from "./schema";

export const deleteSale = async (data: DeleteSaleSchema) => {
  deleteSaleSchema.parse(data);

  
  await db.$transaction(async (trx) => {
    const sale = await db.sale.findUnique({
      where: {
        id: data.id,
      },
      include: {
        saleProducts: true,
      },
    });
  
    if (!sale) return;
    await trx.sale.delete({
      where: {
        id: data.id,
      },
    });

    for (const product of sale.saleProducts) {
      await db.product.update({
        where: {
          id: product.productId,
        },
        data: {
          stock: {
            increment: product.quantity,
          },
        },
      });
    }
  });
  revalidatePath("/products");
  revalidatePath("/sales");
  revalidatePath("/");
};
