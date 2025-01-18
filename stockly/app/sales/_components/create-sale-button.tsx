"use client";

import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import UpsertSheetContent from "./upsert-sheet-content";
import { Product } from "@prisma/client";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { useState } from "react";

interface CreateButtonSaleProps {
  products: Product[];
  productOptions: ComboboxOption[];
};

const CreateSaleButton = (props: CreateButtonSaleProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button>Nova Venda</Button>
      </SheetTrigger>
      <UpsertSheetContent onSubmitSuccess={() => setSheetIsOpen(false)} {...props} />
    </Sheet>
  )
};

export default CreateSaleButton;