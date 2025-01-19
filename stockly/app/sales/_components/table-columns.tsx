"use client";

import { SalesDto } from "@/app/_data-access/sale/get-sales";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import SalesTableDropdownMenu from "./table-dropdown-menu";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { ComboboxOption } from "@/app/_components/ui/combobox";

export interface SaleTableColumn extends SalesDto {
  products: ProductDto[];
  productOptions: ComboboxOption[];
};

export const saleTableColumns: ColumnDef<SaleTableColumn>[] = [
  {
    accessorKey: "productName",
    header: "Produtos",
  },
  {
    accessorKey: "totalProducts",
    header: "Quantidade",
  },
  {
    header: "Valor Total",
    cell: ({row: {original: {totalAmount}}}) => formatCurrency(totalAmount)
  },
  {
    header: "Data",
    cell: ({
      row: {
        original: { date },
      }
    }) => new Date(date).toLocaleDateString()
  },
  {
    header: "Ações",
    // aqui renomeamos o original para sale
    cell: ({ row: { original: sale } }) => (
      <SalesTableDropdownMenu
        sale={sale}
        productOptions={sale.productOptions}
        products={sale.products}
      />
    )
  }
]