import { screen } from "@testing-library/react";
import Products from "mocks/products.json";
import "@testing-library/jest-dom/extend-expect";
import { HttpClient } from "src/core/services/http-client.js";
import { renderPage, mockAxios } from "tests/utils/render.js";

describe("Home Page", () => {
  const requestUrl = "http://www.test-domain.com";
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    // const mockIntersectionObserver = jest.fn<any>();
    // mockIntersectionObserver.mockReturnValue({
    //   observe: () => null,
    //   unobserve: () => null,
    //   disconnect: () => null,
    // });
    // window.IntersectionObserver = mockIntersectionObserver;
    process.env.IS_SERVER = true;
  });

  it("Should render Home Page without error", async () => {
    mockAxios.onGet(HttpClient.setUrl("/api/product")).replyOnce(200, { products: Products });

    await renderPage(requestUrl);

    const homePage = screen.getByTestId("home-page");
    const productCard = screen.getByTestId(`product-card-${Products[0].id}`);
    expect(homePage).toBeInTheDocument();
    expect(productCard).toBeInTheDocument();
  });
});
