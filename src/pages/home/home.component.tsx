import { connect } from "react-redux";
import { RootState } from "src/redux/create-store.js";
import { fetchProducts } from "./home.redux.js";
import { Link } from "react-router-dom";
import HomeReducer from "pages/home/home.redux";
import { Helmet } from "react-helmet";
import { ContextDataWithStore } from "src/core/models/context-with-store.model.js";

const Home = (props: HomeProps) => {
  const pageData = props.pageData;
  return (
    <>
      <Helmet>
        {/* <title>{pageData.seo?.title}</title> */}
        <body className="my-class" />
      </Helmet>
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
            {pageData.products.map((product, index) => {
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
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    pageData: state.home.pageData,
  };
};
export default connect(mapStateToProps, {})(Home);

export interface HomeProps extends ReturnType<typeof mapStateToProps> {}

export async function getInitialProps(ctx: ContextDataWithStore) {
  return ctx.store.dispatch(fetchProducts());
}

export const reducer = {
  home: HomeReducer,
};
