"use client"

import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { SheetContent,SheetDescription,SheetHeader,SheetTitle } from "@/app/_components/ui/sheet"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/table";
import { formatCurrency } from "@/app/_helpers/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SalesTableDropdownMenu from "./table-dropdown-menu";

const formSchema = z.object({
  productId: z.string().uuid({
    message: "O produto selecionado é inválido."
  }),
  quantity: z.coerce.number().int().positive({
    message: "A quantidade deve ser maior que 0."
  }),
})

type FormSchema = z.infer<typeof formSchema>;

interface UpsertSheetContentProps {
  products: Product[];
  productOptions: ComboboxOption[];
};

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSheetContent = ({ products, productOptions }: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    }
  });

  const onSubmit = (data: FormSchema) => {
    const selectedProduct = products.find(product => product.id === data.productId);
    if (!selectedProduct) return;

    // aqui estamos pegando a lista anterior que é o ...product e adicionando um novo produto
    setSelectedProducts((currenctProduct) => {
      const existingProduct = currenctProduct.find((product => product.id === data.productId));
      if (existingProduct) {
        return currenctProduct.map((product) => {
          if (product.id === data.productId) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            }
          }
          return product;
        })
      }
      return [
        ...currenctProduct,
        {
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        }
      ]
    })
    form.reset();
  };

  // useMemo so funcionará quando selectedProducts tiver alterações
  const productsTotal = useMemo(() => {
    return selectedProducts.reduce((acc,product) => {
      return acc + product.price * product.quantity;
    },0);
  },[selectedProducts]);

  const onDelete = (productId: string) => {
    setSelectedProducts((currentProducts) => {
      return currentProducts.filter((product) => product.id !== productId);
    })
  }

  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>
          Insira as informações da venda abaixo.
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form className="py-6 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel>
                  Produto
                </FormLabel>
                <FormControl>
                  <Combobox
                    options={productOptions}
                    placeholder="Selecione um produto"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Quantidade
                </FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="Insire a quantidade"/>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="gap-2 w-full" variant="secondary">
            <PlusIcon size={16} />
            Adicionar produto à venda
          </Button>
        </form>
      </Form>

      <Table>
        <TableCaption>Lista de produtos adicionado na venda.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{formatCurrency(product.price * product.quantity)}</TableCell>
              <TableCell>
                <SalesTableDropdownMenu product={product} onDelete={onDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{formatCurrency(productsTotal)}</TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

    </SheetContent>
  )
};

export default UpsertSheetContent;