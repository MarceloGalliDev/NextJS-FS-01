import { deleteSale } from "@/app/_actions/sale/delete-sale";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { Sale } from "@prisma/client";
import { MoreHorizontalIcon,ClipboardCopyIcon,EditIcon,TrashIcon } from "lucide-react";
import { toast } from "sonner";
import UpsertSheetContent from "./upsert-sheet-content";
import { useState } from "react";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { SalesDto } from "@/app/_data-access/sale/get-sales";

interface SalesTableDropdownMenuProps {
  sale: Pick<SalesDto, "id" | "saleProducts">;
  productOptions: ComboboxOption[];
  products: ProductDto[];
};

const SalesTableDropdownMenu = ({
  sale,
  productOptions,
  products
}: SalesTableDropdownMenuProps) => {
  const [upsertSheetIsOpen,setUpsertSheetIsOpen] = useState(false);

  const handleDelete = async () => {
      try {
        await deleteSale({ id: sale.id });
        toast.success("Venda excluído com sucesso");
      } catch (error) {
        console.error(error);
        toast.error("Ocorreu um erro ao excluír a venda");
      }
    }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(sale.id)
    toast.success("ID copiado com sucesso!")
  }
  return (
    <Sheet open={upsertSheetIsOpen} onOpenChange={setUpsertSheetIsOpen}>

      <AlertDialog>
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
              onClick={handleCopyToClipboard}
            >
              <ClipboardCopyIcon size={16} />
              Copiar ID
            </DropdownMenuItem>

            <SheetTrigger asChild>
              <DropdownMenuItem
                className="gap-1.5"
              >
                <EditIcon size={16} />
                Editar
              </DropdownMenuItem>
            </SheetTrigger>

            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="gap-1.5" >
                <TrashIcon size={16} />
                Excluir
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a excluir permanentemente a venda{" "}
              <strong>{sale.id}</strong>. Você deseja continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <UpsertSheetContent
        saleId={sale.id}
        productOptions={productOptions}
        products={products}
        onSubmitSuccess={() => setUpsertSheetIsOpen(false)}
        defaultSelectedProducts={sale.saleProducts.map((saleProduct) => ({
          id: saleProduct.productId,
          quantity: saleProduct.quantity,
          price: Number(saleProduct.unitPrice),
          name: saleProduct.productName
        }))}
      />
    </Sheet>
  )
}

export default SalesTableDropdownMenu;