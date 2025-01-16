import { DataTable } from "../_components/ui/data-table";
import { cachedGetProducts } from "../_data-access/product/get-products";
import AddProductButton from "./_components/create-product-button";
import { productsTableColumns } from "./_components/table-columns";


const ProductsPage = async () => {
  const products = await cachedGetProducts();

  return (
    <>
      <div className="m-8 w-full space-y-8 p-8 rounded-lg bg-white">
        {/* ESQUERDA */}
        <div className="flex w-full items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">
              Gestão de Produtos
            </span>
            <h2 className="text-xl font-semibold">
              Produtos
            </h2>
          </div>
          <AddProductButton />
        </div>
        <DataTable columns={productsTableColumns} data={JSON.parse(JSON.stringify(products))}/>
        {/* DIREITA */}
      </div>
    </>
  );
};

export default ProductsPage;

//server component