import axios from "axios";
import { createRequire } from "module";
import { exit } from "node:process";
const require = createRequire(import.meta.url);

const shell = require("shelljs");
axios.get(`http://localhost:5000`, { responseType: "text" }).then((resp) => {
  let PORT = 7000;
  let TEST_API_PORT = 7002;
  if (resp.status !== 200) {
    shell.exec(`cross-env TEST_API_PORT=${TEST_API_PORT} PORT=${PORT} npm run build:cypress`, {
      async: false,
    });
    shell.exec(`cross-env TEST_API_PORT=${TEST_API_PORT} PORT=${PORT} npm run start:cypress:ci`, {
      async: true,
    });
  }
  PORT = 5000;
  TEST_API_PORT = 3002;
  shell.exec(
    // eslint-disable-next-line max-len
    `npm run jest:test && cross-env TEST_API_PORT=${TEST_API_PORT} PORT=${PORT} npm run cypress:run`,
  );
  exit();
});
