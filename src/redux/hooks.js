import { useSelector } from "react-redux";
import { selectInvoiceList } from "./invoicesSlice";
import { selectProductList } from "./productSlice";

export const useInvoiceListData = () => {
  const invoiceList = useSelector(selectInvoiceList);

  const getOneInvoice = (receivedId) => {
    return (
      invoiceList.find(
        (invoice) => invoice.id.toString() === receivedId.toString()
      ) || null
    );
  };

  const listSize = invoiceList.length;

  return {
    invoiceList,
    getOneInvoice,
    listSize,
  };
};

export const useProductListData = () => {
  const products = useSelector(selectProductList) || [];

  const getOneProduct = (receivedId) => {
    return (
      products.find(
        (product) => product.id.toString() === receivedId.toString()
      ) || null
    );
  };

  const listSize = products.length;

  return {
    productList: products,
    getOneProduct,
    listSize,
  };
};