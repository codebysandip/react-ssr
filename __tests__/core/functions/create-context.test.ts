import { createContextClient, createContextServer } from "core/functions/create-context.js";

describe("Create Context for server and client", () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });
  it("Should throw error when createContextServer called on client", () => {
    process.env.IS_SERVER = false;
    expect.assertions(1);
    try {
      createContextServer({} as any, {} as any);
    } catch (e) {
      expect((e as Error).message).toBe(
        "createContextServer function can execute only on server!!",
      );
    }
  });

  it("Should throw error when createContextClient called on server", () => {
    process.env.IS_SERVER = true;
    expect.assertions(1);
    try {
      createContextClient({} as any, {} as any, {});
    } catch (e) {
      expect((e as Error).message).toBe(
        "createContextClient function can execute only on client!!",
      );
    }
  });
});
