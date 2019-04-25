import { renderPropsHelper } from "@src/utils";

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

  test.todo("mapRouteConfigToStargazerRouteMap", () => {
    /**
     * TODO: Add tests.
     */
  });

  test.todo("getStackNavigatorConfig", () => {
    /**
     * TODO: Add tests.
     */
  });
});
