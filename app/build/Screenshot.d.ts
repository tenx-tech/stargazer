import React from "react";
import { NavigationScreenProp } from "react-navigation";
import { ScreenshotData } from "./App";
export interface ScreenshotControllerProps {
    name: string;
    viewRef: any;
    paramsForNextScreen?: any;
    nextScreen: string;
    finalScreen?: boolean;
    screenshotDelay?: number;
    navigation: NavigationScreenProp<{}>;
    captureImage: (photoData: ScreenshotData, finalScreen: boolean) => Promise<void>;
}
declare class ScreenshotController extends React.Component<ScreenshotControllerProps, {}> {
    timer: any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    takeScreenshot: () => Promise<void>;
    goToNextScreen: () => void;
}
export default ScreenshotController;
