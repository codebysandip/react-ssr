import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { RootState } from "src/redux/create-store.js";
import { fetchProductById } from "../home.redux.js";
import HomeReducer from "pages/home/home.redux";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { ContextDataWithStore } from "src/core/models/context-with-store.model.js";

class EditProduct extends Component<EditComponentProps> {
  private editProductSchema = Yup.object().shape({
    title: Yup.string().required(),
    price: Yup.number().required(),
    description: Yup.string().required(),
    category: Yup.string().required(),
  });

  public static async getInitialProps(ctx: ContextDataWithStore) {
    return ctx.store.dispatch(fetchProductById(ctx.params.id as number, ctx));
  }

  render(): ReactNode {
    const product = this.props.productById;
    if (!product) {
      return <h1>Data Loading...</h1>;
    }
    return (
      <div>
        <h1>Edit Product</h1>
        <Formik
          initialValues={{
            title: product.title,
            price: product.price,
            category: product.category,
            description: product.description,
          }}
          validationSchema={this.editProductSchema}
          onSubmit={(data) => console.log("edit product!!", data)}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="editProductTitle">Title</label>
                <Field
                  type="text"
                  className="form-control"
                  id="editProductTitle"
                  placeholder="Enter title"
                  name="title"
                />
                {errors.title && touched.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="editProductPrice">Price</label>
                <Field
                  name="price"
                  type="number"
                  className="form-control"
                  id="editProductPrice"
                  placeholder="Enter Price"
                />
                {errors.price && touched.price && <div className="invalid-feedback">{errors.price}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="editProductDescription">Description</label>
                <Field
                  type="text"
                  className="form-control"
                  id="editProductDescription"
                  placeholder="Enter Description"
                  name="description"
                />
                {errors.description && touched.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="editProductCategory">Category</label>
                <Field
                  name="category"
                  type="text"
                  className="form-control"
                  id="editProductCategory"
                  placeholder="Enter category"
                />
                {errors.category && touched.category && <div className="invalid-feedback">{errors.category}</div>}
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </Form>
          )}
        </Formik>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);

interface EditComponentProps extends ReturnType<typeof mapStateToProps> {}

export const reducer = {
  home: HomeReducer,
};
