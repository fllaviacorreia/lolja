export type RoutesParams = {
    ClientList: undefined;
    AddClient: undefined;
    UpdateClient: { client: any; onClientUpdated: (updatedClient: any) => void };
    ProductList: undefined;
    AddProduct: undefined;
    UpdateProduct: { product: any; onProductUpdated: (updatedProduct: any) => void };
  };
  