import request from "request-promise";
import * as Controller from "./SearchController";

jest.mock("request-promise");

describe("SearchController", () => {
  test("an empty query string", async () => {
    (request as any).mockImplementation(() => '{"features": []}');
    const result = await Controller.getPlacesByName("Paris");
    expect(result).toEqual({ features: [] });
  });

  test("an invalid non-json response", async () => {
    (request as any).mockImplementation(() => "Service Unavailable.");
    await expect(Controller.getPlacesByName("Chamonix")).rejects.toThrow(
      SyntaxError
    );
  });
});
