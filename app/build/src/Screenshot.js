import { takeSnapshotAsync } from "expo";
import React from "react";
import { Dimensions, View } from "react-native";
import { NavigationActions, StackActions, } from "react-navigation";
import { STARGAZER_INIT } from "./Navigator";
/* =============================================================================
Types and Config
============================================================================= */
/**
 * Delay after component mounts before taking screenshot to allow
 * the component to fully render.
 */
const TIMER_DELAY = 850;
const { width, height } = Dimensions.get("window");
/* =============================================================================
Component
--------------------------------------------------------------------------------
- Component responsible for rendering a screen, taking a snapshot, and then
  advancing to the next screen in the route configuration.
============================================================================= */
class ScreenshotController extends React.Component {
    constructor() {
        super(...arguments);
        this.takeScreenshot = async () => {
            const { name, finalScreen, captureImage, viewRef } = this.props;
            /**
             * Capture screenshot with Expo snapshot tool.
             */
            const result = await takeSnapshotAsync(viewRef(), {
                width,
                height,
                quality: 1,
                format: "png",
                result: "data-uri",
            });
            /**
             * Store screenshot data:
             */
            await captureImage({
                name,
                screenshot: result,
            }, Boolean(finalScreen));
            /**
             * Go to next screen, or if this is the final screen reset to the
             * initial screen.
             */
            if (!finalScreen) {
                this.goToNextScreen();
            }
            else {
                this.props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: STARGAZER_INIT,
                            params: { uploadComplete: true },
                        }),
                    ],
                }));
            }
        };
        this.goToNextScreen = () => {
            // tslint:disable-next-line
            this.timer = setTimeout(() => {
                this.props.navigation.navigate(this.props.nextScreen, this.props.paramsForNextScreen);
            }, 250);
        };
    }
    componentDidMount() {
        // tslint:disable-next-line
        this.timer = setTimeout(async () => {
            this.takeScreenshot();
        }, this.props.screenshotDelay || TIMER_DELAY);
    }
    componentWillUnmount() {
        if (this.timer) {
            // @ts-ignore
            clearTimeout(this.timer);
            // tslint:disable-next-line
            this.timer = null;
        }
    }
    render() {
        return <View style={{ flex: 1 }}>{this.props.children}</View>;
    }
}
/* =============================================================================
Export
============================================================================= */
export default ScreenshotController;
//# sourceMappingURL=Screenshot.js.map