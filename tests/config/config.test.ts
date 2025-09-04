describe("configLoader", () => {
  describe("load", () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
      process.env = { ...OLD_ENV };
    });

    afterAll(() => {
      process.env = { ...OLD_ENV };
    });
  });
});
