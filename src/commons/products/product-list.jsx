import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./product-cart";
import PropType from 'prop-types';

const ProductList = ({ products, size }) => {
  // Customize settings for the carousel
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: size,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {products && products.map((product) => (
        <ProductCard key={`product-slide-${product.Id}`} product ={ product} />
      ))}
    </Slider>
  );
};

ProductList.prototype = {
  products: PropType.array.isRequired,
  size: PropType.number
}

export default ProductList;
