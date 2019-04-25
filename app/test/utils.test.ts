import { renderPropsHelper } from "../src/utils";

describe("utils", () => {
  test("renderPropsHelper", () => {
    const mockInput = {
      navigation: {},
      screenProps: {
        viewRef: {},
        captureImage: {},
      },
    };

    // @ts-ignore
    const result = renderPropsHelper(mockInput);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "captureImage": Object {},
        "navigation": Object {},
        "viewRef": Object {},
      }
    `);
  });

  test.skip("mapRouteConfigToStargazerRouteMap", () => {
    /**
     * TODO: Test this method.
     */
  });

  test.skip("getStackNavigatorConfig", () => {
    /**
     * TODO: Test this method.
     */
  });
});
