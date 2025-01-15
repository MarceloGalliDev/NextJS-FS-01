"use client";

import { useState } from "react";
import { Badge } from "@/app/_components/ui/badge"
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { CircleIcon, ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog"

import { Button } from "@/app/_components/ui/button";
import DeleteProductsDialogContent from "./delete-dialog-content";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import UpsertProductDialogContent from "./upsert-dialog-content";


const getStatusLabel = (status: string) => {
  if (status === 'IN_STOCK') {
    return 'Em estoque'
  }
  return 'Sem estoque'
};

export const productsTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor Unitário",
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
    cell: (row) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [editDialogOpen, setEditDialogOpen] = useState(false)
      const product = row.row.original
      return (
        <AlertDialog>
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <MoreHorizontalIcon size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="gap-1.5"
                  onClick={() => navigator.clipboard.writeText(product.id)}
                >
                  <ClipboardCopyIcon size={16} />
                  Copiar ID
                </DropdownMenuItem>

                <DialogTrigger asChild>
                  <DropdownMenuItem
                    className="gap-1.5"
                  >
                    <EditIcon size={16} />
                    Editar
                  </DropdownMenuItem>
                </DialogTrigger>

                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="gap-1.5" >
                    <TrashIcon size={16} />
                    Excluir
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <UpsertProductDialogContent
              defaultValues={
                {
                  id: product.id,
                  name: product.name,
                  price: Number(product.price),
                  stock: product.stock,
                }
              }
              onSuccess={() => setEditDialogOpen(false)}
            />
            <DeleteProductsDialogContent productId={product.id} productName={product.name} />
          </Dialog>
        </AlertDialog>
      )
    }
  }
]
