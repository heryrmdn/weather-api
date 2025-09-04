import { responseUtil } from "../../src/utils/response.util";

describe("responseUtil", () => {
  describe("responseMessage", () => {
    it("Test", () => {
      const responseMessage = responseUtil.responseMessage(200, "OK");
      expect(responseMessage).toEqual({ status: 200, message: "OK" });
    });
  });

  describe("responseData", () => {
    it("Test", () => {
      const responseData = responseUtil.responseData(200, "OK", { id: 1, name: "name 1" });
      expect(responseData).toEqual({ status: 200, message: "OK", data: { id: 1, name: "name 1" } });
    });
  });

  describe("responseError", () => {
    it("Test", () => {
      const error = new Error("Got some Error");
      const responseError = responseUtil.responseError(200, "OK", error);
      expect(responseError).toEqual({ status: 200, message: "OK", error });
    });
  });
});
