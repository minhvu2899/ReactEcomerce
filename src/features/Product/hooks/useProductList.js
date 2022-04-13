import productApi from "api/productApi";
import { useEffect, useState } from "react";

export default function useProductList(filter) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await productApi.getAll(filter);

        setProductList(data.data.data);
      } catch (error) {
        console.log("Failed to fetch product", error);
      }
      setLoading(false);
    })();
  }, []);

  return { productList, loading };
}
