import "server-only";

import { db } from "@/app/_lib/prisma"

export interface SalesDto {
  id: string;
  productName: string;
  totalProducts: number;
  totalAmount: number;
  date: Date,
}

export const getSales = async (): Promise<SalesDto[]> => {
  const sales = await db.sale.findMany({
    include: {
      saleProducts: {
        include: {
          product: true
        }
    } },
  })
  return sales.map((sale): SalesDto => ({
    id: sale.id,
    date: sale.date,
    productName: sale.saleProducts.map(saleProduct => saleProduct.product.name).join(" - "),
    totalAmount: sale.saleProducts.reduce(
      (acc, saleProduct) => acc + saleProduct.quantity * Number(saleProduct.unitPrice), 0
    ),
    totalProducts: sale.saleProducts.reduce(
      (acc, saleProduct) => acc + saleProduct.quantity, 0
    ),
  }))
};