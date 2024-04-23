import React from "react";
import { Link } from "react-router-dom";
import ProductList from "../commons/products/product-list";

const Home = () => {
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
            <ProductList />
          </div>
          <div className="text-center display-4 mb-5">
            <p>
              <strong>
                <b>Populer</b>
              </strong>
            </p>
            <ProductList />
          </div>
          <div className="text-center display-4 mb-5">
            <p>
              <strong>
                <b>Sale</b>
              </strong>
            </p>
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
