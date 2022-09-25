import { configure } from '@testing-library/dom'
import { configureHttpClient } from "src/core/functions/configure-http-client.js";

configure({
  testIdAttribute: "data-test-id"
})

configureHttpClient();
