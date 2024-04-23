import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../commons/products/product-list";
import { getListProduct } from "../app/store/features/product-slice";

const Home = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.productReducer.products);
  const loading = useSelector((state) => state.productReducer.loading);
  const error = useSelector((state) => state.productReducer.error);
  
  useEffect(() => {
    dispatch(getListProduct());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="container mt-5 shadow-lg">
      <div className="row">
        <div className="col-md-1">
          <ul className="list-group">
            <li className="list-group-item list-group-item-action">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="list-group-item list-group-item-action">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="list-group-item list-group-item-action">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-11">
          <div className="text-center display-4 mb-5">
            <p>
              <strong>
                <b>Hot trend</b>
              </strong>
            </p>
            <ProductList products={products} size={4} />
          </div>
          <div className="text-center display-4 mb-5">
            <p>
              <strong>
                <b>Populer</b>
              </strong>
            </p>
            <ProductList products={products} size={4} />
          </div>
          <div className="text-center display-4 mb-5">
            <p>
              <strong>
                <b>Sale</b>
              </strong>
            </p>
            <ProductList products={products} size={4} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
