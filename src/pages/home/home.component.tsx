import { connect } from "react-redux";
import { ContextData } from "src/core/models/context.model.js";
import { RootState } from "src/redux/create-store.js";
import { HomeData } from "./home.model.js";
import { fetchProducts } from "./home.redux.js";
import { Link } from "react-router-dom";
import HomeReducer from "pages/home/home.redux";

const Home = (props: HomeProps) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.products.map((product, index) => {
            return (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.rating.rate}</td>
                <td>
                  <Link to={`/product/edit/${product.id}`} type="button" className="btn btn-primary btn-sm me-3">
                    Edit
                  </Link>
                  <button type="button" className="btn btn-primary btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    products: state.home.products,
  };
};
export default connect(mapStateToProps, {})(Home);

export interface HomeProps extends HomeData {}

export async function getInitialProps(ctx: ContextData) {
  return ctx.store.dispatch(fetchProducts());
}

export const reducer = {
  home: HomeReducer,
};
