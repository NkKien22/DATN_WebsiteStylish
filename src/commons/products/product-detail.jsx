import React, { useState, useEffect } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { HeartOutlined } from "@ant-design/icons";
import { Flex, Rate, Tag, Button, message } from "antd";
import Slider from "react-slick";
import { CartServices } from "../../app/store/features";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);
  const productDetail = useSelector(
    (state) => state.productReducer.product_detail
  );
  const loading = useSelector((state) => state.productReducer.loading);
  const error = useSelector((state) => state.productReducer.error);

  // const [variant, setVariant] = useState(productDetail?.ProductVariants[0]);
  const [variant, setVariant] = useState({});

  // Customize settings for the carousel
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
  };

  useEffect(() => {
    if (productDetail?.ProductVariants) {
      setVariant(productDetail.ProductVariants[0]);
    }
  }, [productDetail]);

  const addToCart = () => {
    const values = {
      UserId: cart.UserId,
      CartId: cart.Id,
      ProductVariantId: variant.Id,
      ProductName: productDetail.Name,
      ImageUrl: productDetail.ImageUrl,
    };
    dispatch(CartServices.addCartItem(values))
      .unwrap()
      .then((res) => {
        if (res.StatusCode === 200) {
          message.success({
            content: "Update success",
            duration: 2,
          });
        } else {
          message.error({
            content: "Create faild " + res.Message,
            duration: 2,
            style: {
              marginTop: "3vh",
            },
          });
        }
      })
      .catch((err) => {
        message.error({
          content: err.Payload.TranslateContext + " : " + err.Message,
          duration: 2,
          style: {
            marginTop: "3vh",
          },
        });
      });
  };

  if (loading || !productDetail) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      {productDetail && variant && (
        <>
          <section className="py-5">
            <div className="container">
              <div className="row gx-5">
                <aside className="col-lg-6">
                  <Slider {...settings}>
                    {variant &&
                      variant?.Images?.map((img) => (
                        <a
                          data-fslightbox="mygalley"
                          className="rounded-4"
                          data-type="image"
                        >
                          <img
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100vh",
                              margin: "auto",
                            }}
                            className="rounded-4 fit"
                            src={img}
                          />
                        </a>
                      ))}
                  </Slider>
                </aside>
                <main className="col-lg-6">
                  <div className="ps-lg-3">
                    <h4 className="title text-dark">
                      {`${productDetail.Name} - ${variant?.SkuId}`}
                    </h4>
                    <div className="d-flex flex-row my-3">
                      <div className="text-warning mb-1 me-2">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>

                        <span className="ms-1">
                          <Rate
                            disabled
                            value={productDetail?.Rate}
                            character={<HeartOutlined />}
                            allowHalf
                          />
                        </span>
                      </div>
                      <span className="text-muted">
                        <i className="fas fa-shopping-basket fa-sm mx-1"></i>154
                        orders
                      </span>
                      <span className="text-success ms-2">In stock</span>
                    </div>

                    <div className="mb-3">
                      <span className="h5">{variant.Price}</span>
                      <span className="text-muted"> vnd</span>
                    </div>
                    <p>{productDetail.ShortDescription}</p>
                    <p>{productDetail.Description}</p>

                    <div className="row">
                      <dt className="col-3">Type:</dt>
                      <dd className="col-9">Regular</dd>

                      <dt className="col-3">Color</dt>
                      <dd className="col-9">Brown</dd>

                      <dt className="col-3">Material</dt>
                      <dd className="col-9">Cotton, Jeans</dd>

                      <dt className="col-3">Brand</dt>
                      <dd className="col-9">Reebook</dd>
                    </div>

                    <hr />
                    <Flex gap="4px 0" wrap="wrap">
                      {productDetail &&
                        productDetail?.ProductVariants?.map((vv) => (
                          <Tag onClick={() => setVariant(vv)} color="#2db7f5">
                            {vv.SkuId}
                          </Tag>
                        ))}
                    </Flex>
                    <hr />

                    <div className="row mb-4">
                      <div className="col-md-4 col-6">
                        <label className="mb-2">Size</label>
                        <select
                          className="form-select border border-secondary"
                          style={{ height: "35px" }}
                        >
                          <option>Small</option>
                          <option>Medium</option>
                          <option>Large</option>
                        </select>
                      </div>
                      <div className="col-md-4 col-6 mb-3">
                        <label className="mb-2 d-block">Quantity</label>
                        <div
                          className="input-group mb-3"
                          style={{ width: "170px" }}
                        >
                          <button
                            className="btn btn-white border border-secondary px-3"
                            type="button"
                            id="button-addon1"
                            data-mdb-ripple-color="dark"
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <input
                            type="text"
                            className="form-control text-center border border-secondary"
                            placeholder="14"
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"
                          />
                          <button
                            className="btn btn-white border border-secondary px-3"
                            type="button"
                            id="button-addon2"
                            data-mdb-ripple-color="dark"
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <a href="#" className="btn btn-warning shadow-0">
                      {" "}
                      Buy now{" "}
                    </a>
                    <Button
                      onClick={() => addToCart()}
                      className="btn btn-primary shadow-0"
                    >
                      <i className="me-1 fa fa-shopping-basket"></i> Add to cart{" "}
                    </Button>
                    <a
                      href="#"
                      className="btn btn-light border border-secondary py-2 icon-hover px-3"
                    >
                      {" "}
                      <i className="me-1 fa fa-heart fa-lg"></i> Save{" "}
                    </a>
                  </div>
                </main>
              </div>
            </div>
          </section>

          <section className="bg-light border-top py-4">
            <div className="container">
              <div className="row gx-4">
                <div className="col-lg-8 mb-4">
                  <div className="border rounded-2 px-3 py-2 bg-white">
                    <ul
                      className="nav nav-pills nav-justified mb-3"
                      id="ex1"
                      role="tablist"
                    >
                      <li className="nav-item d-flex" role="presentation">
                        <a
                          className="nav-link d-flex align-items-center justify-content-center w-100 active"
                          id="ex1-tab-1"
                          data-mdb-toggle="pill"
                          href="#ex1-pills-1"
                          role="tab"
                          aria-controls="ex1-pills-1"
                          aria-selected="true"
                        >
                          Specification
                        </a>
                      </li>
                      <li className="nav-item d-flex" role="presentation">
                        <a
                          className="nav-link d-flex align-items-center justify-content-center w-100"
                          id="ex1-tab-2"
                          data-mdb-toggle="pill"
                          href="#ex1-pills-2"
                          role="tab"
                          aria-controls="ex1-pills-2"
                          aria-selected="false"
                        >
                          Warranty info
                        </a>
                      </li>
                      <li className="nav-item d-flex" role="presentation">
                        <a
                          className="nav-link d-flex align-items-center justify-content-center w-100"
                          id="ex1-tab-3"
                          data-mdb-toggle="pill"
                          href="#ex1-pills-3"
                          role="tab"
                          aria-controls="ex1-pills-3"
                          aria-selected="false"
                        >
                          Shipping info
                        </a>
                      </li>
                      <li className="nav-item d-flex" role="presentation">
                        <a
                          className="nav-link d-flex align-items-center justify-content-center w-100"
                          id="ex1-tab-4"
                          data-mdb-toggle="pill"
                          href="#ex1-pills-4"
                          role="tab"
                          aria-controls="ex1-pills-4"
                          aria-selected="false"
                        >
                          Seller profile
                        </a>
                      </li>
                    </ul>

                    <div className="tab-content" id="ex1-content">
                      <div
                        className="tab-pane fade show active"
                        id="ex1-pills-1"
                        role="tabpanel"
                        aria-labelledby="ex1-tab-1"
                      >
                        <p>
                          With supporting text below as a natural lead-in to
                          additional content. Lorem ipsum dolor sit amet,
                          consectetur adipisicing elit, sed do eiusmod tempor
                          incididunt ut labore et dolore magna aliqua. Ut enim
                          ad minim veniam, quis nostrud exercitation ullamco
                          laboris nisi ut aliquip ex ea commodo consequat. Duis
                          aute irure dolor in reprehenderit in voluptate velit
                          esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        <div className="row mb-2">
                          <div className="col-12 col-md-6">
                            <ul className="list-unstyled mb-0">
                              <li>
                                <i className="fas fa-check text-success me-2"></i>
                                Some great feature name here
                              </li>
                              <li>
                                <i className="fas fa-check text-success me-2"></i>
                                Lorem ipsum dolor sit amet, consectetur
                              </li>
                              <li>
                                <i className="fas fa-check text-success me-2"></i>
                                Duis aute irure dolor in reprehenderit
                              </li>
                              <li>
                                <i className="fas fa-check text-success me-2"></i>
                                Optical heart sensor
                              </li>
                            </ul>
                          </div>
                          <div className="col-12 col-md-6 mb-0">
                            <ul className="list-unstyled">
                              <li>
                                <i className="fas fa-check text-success me-2"></i>
                                Easy fast and ver good
                              </li>
                              <li>
                                <i className="fas fa-check text-success me-2"></i>
                                Some great feature name here
                              </li>
                              <li>
                                <i className="fas fa-check text-success me-2"></i>
                                Modern style and design
                              </li>
                            </ul>
                          </div>
                        </div>
                        <table className="table border mt-3 mb-2">
                          <tr>
                            <th className="py-2">Display:</th>
                            <td className="py-2">
                              13.3-inch LED-backlit display with IPS
                            </td>
                          </tr>
                          <tr>
                            <th className="py-2">Processor capacity:</th>
                            <td className="py-2">
                              2.3GHz dual-core Intel Core i5
                            </td>
                          </tr>
                          <tr>
                            <th className="py-2">Camera quality:</th>
                            <td className="py-2">720p FaceTime HD camera</td>
                          </tr>
                          <tr>
                            <th className="py-2">Memory</th>
                            <td className="py-2">8 GB RAM or 16 GB RAM</td>
                          </tr>
                          <tr>
                            <th className="py-2">Graphics</th>
                            <td className="py-2">
                              Intel Iris Plus Graphics 640
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div
                        className="tab-pane fade mb-2"
                        id="ex1-pills-2"
                        role="tabpanel"
                        aria-labelledby="ex1-tab-2"
                      >
                        Tab content or sample information now <br />
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo
                      </div>
                      <div
                        className="tab-pane fade mb-2"
                        id="ex1-pills-3"
                        role="tabpanel"
                        aria-labelledby="ex1-tab-3"
                      >
                        Another tab content or sample information now <br />
                        Dolor sit amet, consectetur adipisicing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </div>
                      <div
                        className="tab-pane fade mb-2"
                        id="ex1-pills-4"
                        role="tabpanel"
                        aria-labelledby="ex1-tab-4"
                      >
                        Some other tab content or sample information now <br />
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="px-0 border rounded-2 shadow-0">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Similar items</h5>
                        <div className="d-flex mb-3">
                          <a href="#" className="me-3">
                            <img
                              src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/8.webp"
                              style={{ minWidth: "96px", height: "96px" }}
                              className="img-md img-thumbnail"
                            />
                          </a>
                          <div className="info">
                            <a href="#" className="nav-link mb-1">
                              Rucksack Backpack Large <br />
                              Line Mounts
                            </a>
                            <strong className="text-dark"> $38.90</strong>
                          </div>
                        </div>

                        <div className="d-flex mb-3">
                          <a href="#" className="me-3">
                            <img
                              src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/9.webp"
                              style={{ minWidth: "96px", height: "96px" }}
                              className="img-md img-thumbnail"
                            />
                          </a>
                          <div className="info">
                            <a href="#" className="nav-link mb-1">
                              Summer New Men's Denim <br />
                              Jeans Shorts
                            </a>
                            <strong className="text-dark"> $29.50</strong>
                          </div>
                        </div>

                        <div className="d-flex mb-3">
                          <a href="#" className="me-3">
                            <img
                              src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp"
                              style={{ minWidth: "96px", height: "96px" }}
                              className="img-md img-thumbnail"
                            />
                          </a>
                          <div className="info">
                            <a href="#" className="nav-link mb-1">
                              {" "}
                              T-shirts with multiple colors, for men and lady{" "}
                            </a>
                            <strong className="text-dark"> $120.00</strong>
                          </div>
                        </div>

                        <div className="d-flex">
                          <a href="#" className="me-3">
                            <img
                              src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/11.webp"
                              style={{ minWidth: "96px", height: "96px" }}
                              className="img-md img-thumbnail"
                            />
                          </a>
                          <div className="info">
                            <a href="#" className="nav-link mb-1">
                              {" "}
                              Blazer Suit Dress Jacket for Men, Blue color{" "}
                            </a>
                            <strong className="text-dark"> $339.90</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </SkeletonTheme>
  );
};

export default ProductDetail;
