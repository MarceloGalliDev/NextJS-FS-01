import Header, { HeaderLeft, HeaderRight, HeaderSubtitle, HeaderTitle } from "../_components/header";
import { DataTable } from "../_components/ui/data-table";
import { cachedGetProducts } from "../_data-access/product/get-products";
import AddProductButton from "./_components/create-product-button";
import { productsTableColumns } from "./_components/table-columns";


const ProductsPage = async () => {
  const products = await cachedGetProducts();

  return (
    <>
      <div className="m-8 w-full space-y-8 p-8 rounded-lg bg-white">
        <Header>
          <HeaderLeft>
            <HeaderSubtitle>Gestão de Produtos</HeaderSubtitle>
            <HeaderTitle>Produtos</HeaderTitle>
          </HeaderLeft>
          <HeaderRight>
            <AddProductButton />
          </HeaderRight>
        </Header>
        <DataTable columns={productsTableColumns} data={JSON.parse(JSON.stringify(products))}/>
      </div>
    </>
  );
};

export default ProductsPage;

//server component