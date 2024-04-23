import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import { ProductServices } from "../../app/store/features";
import ProductCard from "./product-cart";
import PropType from "prop-types";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const loading = useSelector((state) => state.productReducer.loading);
  const error = useSelector((state) => state.productReducer.error);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (products.length === 0) {
      dispatch(ProductServices.getListProduct());
    }
  }, [dispatch]);

  const onChange = (page) => {
    setCurrentPage(page);
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      {products &&
        products
          .slice(currentPage, currentPage + 8)
          .map((product) => (
            <ProductCard
              key={`product-slide-${product.Id}`}
              product={product}
            />
          ))}
      <Pagination
        size="small"
        onChange={onChange}
        className="mt-5"
        defaultCurrent={1}
        total={Math.ceil(products.length / 8) * 8}
        pageSize={8}
      />
    </>
  );
};

ProductList.prototype = {
  products: PropType.array.isRequired,
  size: PropType.number,
};

export default ProductList;
