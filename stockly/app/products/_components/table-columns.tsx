"use client";

import { Badge } from "@/app/_components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import { CircleIcon } from "lucide-react";
import ProductTableDropdownMenu from "./table-dropdown-menu";
import { ProductDto } from "@/app/_data-access/product/get-products";


const getStatusLabel = (status: string) => {
  if (status === 'IN_STOCK') {
    return 'Em estoque'
  }
  return 'Sem estoque'
};

export const productsTableColumns: ColumnDef<ProductDto>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor Unitário",
    cell: (row) => {
      const product = row.row.original;
      return Intl.NumberFormat('pt-BR',{
        style: 'currency',
        currency: 'BRL'
      }).format(Number(product.price))
    }
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original
      const label = getStatusLabel(product.status)
      return (
        <Badge
          variant={label === 'Em estoque' ? 'default' : 'outline'}
          className="gap-2"
        >
          <CircleIcon
            size={14}
            className={`${label === "Em estoque" ? "text-green-500 fill-green-500" : "text-red-500 fill-red-500"}`}
          />
          {label}
        </Badge>)
    }
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => <ProductTableDropdownMenu product={row.row.original}/>
  }
]
