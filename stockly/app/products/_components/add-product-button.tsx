import { PlusIcon } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { z } from "zod";
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger } from "../../_components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

type FormSchema = z.infer<typeof formSchema>;

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
  price: z.number().min(0.01,{ message: "Preço deve ser maior que 0" }),
  stock: z.number().int().min(0, { message: "Estoque deve ser maior ou igual a 0" }),
})

const AddProductButton = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 1,
    }
  });

  const onSubmit = (data: FormSchema) => {
    console.log({data});
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusIcon size={20} />
          Novo produto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar produto</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
};

export default AddProductButton;