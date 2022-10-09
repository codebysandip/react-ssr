import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { ContextDataWithStore } from "src/core/models/context-with-store.model.js";
import { RootState } from "src/redux/create-store.js";
import HomeReducer, { fetchProductById } from "../home.redux.js";
import "./product-detail.scss";

class ProductDetail extends Component<ProductDetailProps> {
  public static async getInitialProps(ctx: ContextDataWithStore) {
    return ctx.store.dispatch(fetchProductById(ctx.params.id as number, ctx));
  }

  render(): ReactNode {
    const product = this.props.productById;
    /* istanbul ignore if */
    if (!product) {
      return null;
    }
    return (
      <div data-test-id="product-detail-page">
        <div className="container">
          <div className="col-lg-8 border p-3 main-section bg-white">
            <div className="row m-0">
              <div className="col-lg-4 left-side-product-box pb-3">
                <img src={product.image} className="border p-3" />
              </div>
              <div className="col-lg-8">
                <div className="right-side-pro-detail border p-3 m-0">
                  <div className="row">
                    <div className="col-lg-12">
                      <p className="m-0 p-0">{product.title}</p>
                    </div>
                    <div className="col-lg-12">
                      <p className="m-0 p-0 price-pro">{product.price}$</p>
                      <hr className="p-0 m-0" />
                    </div>
                    <div className="col-lg-12 pt-2">
                      <h5>Product Detail</h5>
                      <span>{product.description}</span>
                      <hr className="m-0 pt-2 mt-2" />
                    </div>
                    <div className="col-lg-12">
                      <p className="tag-section">
                        <strong>Tag : </strong>
                        <a href="">Woman</a>
                        <a href="">,Man</a>
                      </p>
                    </div>
                    <div className="col-lg-12 mt-3">
                      <div className="row">
                        <div className="col-lg-6 pb-2">
                          <a href="#" className="btn btn-danger w-100">
                            Add To Cart
                          </a>
                        </div>
                        <div className="col-lg-6">
                          <a href="#" className="btn btn-success w-100">
                            Shop Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    productById: state.home.productById,
  };
};
const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

interface ProductDetailProps extends ReturnType<typeof mapStateToProps> {}

export const reducer = {
  home: HomeReducer,
};
