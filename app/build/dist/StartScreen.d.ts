import React from "react";
import { NavigationScreenProp } from "react-navigation";
interface IProps {
    autoStart: boolean;
    routesLength: number;
    nextScreen: string;
    navigation: NavigationScreenProp<{
        uploadComplete: boolean;
    }>;
    logger: (message: string) => void;
}
interface IState {
    remaining: number;
}
declare class StargazerStartScreen extends React.Component<IProps, IState> {
    interval: any;
    constructor(props: IProps);
    /**
     * Require Camera permissions.
     */
    componentDidMount(): Promise<void>;
    componentDidUpdate(_: IProps, prevState: IState): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    countdown: () => void;
    start: () => void;
    clearInterval: () => void;
}
export default StargazerStartScreen;
