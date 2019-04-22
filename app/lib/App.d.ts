import React from "react";
import { NavigationRouteConfigMap } from "react-navigation";
/**
 * This will be the type definition we must export for this library.
 */
export interface StargazerProps {
    autoStart: boolean;
    disableLogging: boolean;
    stargazerServerUrl: string;
    routes: NavigationRouteConfigMap;
    initialRouteName: string;
    imageAssets?: ReadonlyArray<any>;
    fontAssets?: {
        [key: string]: any;
    };
}
export interface ScreenshotData {
    name: string;
    screenshot: string;
}
interface IState {
    loading: boolean;
}
declare class Stargazer extends React.Component<StargazerProps, IState> {
    view: any;
    constructor(props: StargazerProps);
    componentDidMount(): Promise<void>;
    render(): JSX.Element | null;
    preloadAssets(): Promise<void>;
    captureImage: (image: ScreenshotData, finalScreen: boolean) => Promise<void>;
    uploadImageData: () => Promise<void>;
    logger(message: string): void;
}
export default Stargazer;
