import "server-only";

import { db } from "@/app/_lib/prisma";
import { SaleProduct } from "@prisma/client";

interface SaleProductDto {
  productId: string;
  quantity: number;
  unitPrice: number;
  productName: string;
}

export interface SalesDto {
  id: string;
  productName: string;
  totalProducts: number;
  totalAmount: number;
  date: Date;
  saleProducts: SaleProductDto[];
}

export const getSales = async (): Promise<SalesDto[]> => {
  const sales = await db.sale.findMany({
    include: {
      saleProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return sales.map(
    (sale): SalesDto => ({
      id: sale.id,
      date: sale.date,
      productName: sale.saleProducts
        .map((saleProduct) => saleProduct.product.name)
        .join(" - "),
      totalAmount: sale.saleProducts.reduce(
        (acc, saleProduct) =>
          acc + saleProduct.quantity * Number(saleProduct.unitPrice),
        0,
      ),
      totalProducts: sale.saleProducts.reduce(
        (acc, saleProduct) => acc + saleProduct.quantity,
        0,
      ),
      saleProducts: sale.saleProducts.map(
        (saleProduct): SaleProductDto => ({
          productId: saleProduct.productId,
          productName: saleProduct.product.name,
          quantity: saleProduct.quantity,
          unitPrice: Number(saleProduct.unitPrice),
        }),
      ),
    }),
  );
};
