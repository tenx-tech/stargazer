import React, { Component } from "react";
import ReactDOM from "react-dom";

import logo from "../tenx_logo.png";
import {
  processScreenshotsData,
  ScreenshotItem,
  ScreenshotsData,
} from "./util";

/* =============================================================================
Types and Config
============================================================================= */

interface IState {
  error: boolean;
  loading: boolean;
  search: string;
  desktop: boolean;
  names: ReadonlyArray<string>;
  data: ReadonlyArray<ScreenshotItem>;
  dates: {
    ios: string;
    android: string;
  };
}

/**
 * Adjust for smaller screens
 */
const isDesktop = () => window.innerWidth > 975;

/* =============================================================================
App Component
============================================================================= */

export default class extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      dates: {
        ios: "",
        android: "",
      },
      search: "",
      data: [],
      names: [],
      error: false,
      loading: true,
      desktop: isDesktop(),
    };
  }

  async componentDidMount(): Promise<void> {
    window.addEventListener("resize", this.updateWindowDimensions);

    this.fetchScreenshotsData();
  }

  render(): JSX.Element | null {
    if (this.state.loading) {
      /**
       * TODO: Build some loading UI for the loading condition.
       */
      return null;
    } else if (this.state.error) {
      /**
       * TODO: We should add an error fallback UI here which at a minimum
       * provides instructions for how the user should use the tool and ideally
       * parses the error condition to try to explain what exactly failed.
       */
      console.log("TODO: Handle error state!");
      return null;
    }

    const DESKTOP = this.state.desktop;
    return (
      <div className="App">
        <header className="AppHeader">
          <img src={logo} className="AppLogo" alt="logo" />
          <p className="HeaderTitle">Stargazer UI Testing System</p>
        </header>
        {DESKTOP && (
          <div className="TimestampBlock">
            <p>
              iOS updated on{" "}
              <b>{new Date(this.state.dates.ios).toDateString()}</b>.
            </p>
            <p>
              Android updated on{" "}
              <b>{new Date(this.state.dates.android).toDateString()}</b>.
            </p>
          </div>
        )}
        {DESKTOP && (
          <div className="SideBar">
            <div className="SearchBar">
              <input
                autoFocus
                placeholder={`Filter (${this.state.data.length} total screens)`}
                className="SearchInput"
                value={this.state.search}
                onChange={this.handleSearch}
              />
              {this.state.search && (
                <p className="ClearSearch" onClick={this.clearSearch}>
                  x
                </p>
              )}
            </div>
            <div className="NamesList">{this.renderScreenNamesList()}</div>
          </div>
        )}
        <div
          className="ScreenshotContainer"
          style={{ paddingLeft: DESKTOP ? 300 : 0 }}
        >
          {this.state.data.map(data => {
            // @ts-ignore
            return this.renderScreenshotsItem(data);
          })}
        </div>
      </div>
    );
  }

  renderScreenNamesList = () => {
    return this.state.names
      .filter(name =>
        name.toLowerCase().includes(this.state.search.toLowerCase()),
      )
      .map(name => {
        return (
          <p
            key={name}
            className="ScreenNameOption"
            onClick={() => this.scroll(name)}
          >
            {name}
          </p>
        );
      });
  };

  renderScreenshotsItem = ({ name, data }: ScreenshotItem) => {
    const { ios, android } = data;
    const DESKTOP = this.state.desktop;
    return (
      <div
        key={name}
        className="Screenshot"
        ref={ref => this.assignRef(name, ref)}
      >
        <p className="ScreenshotName">{name}</p>
        <div
          className="DeviceContainer"
          style={{
            margin: "auto",
            width: DESKTOP ? "68vw" : "auto",
            flexDirection: DESKTOP ? "row" : "column",
          }}
        >
          <div className="Device">
            <p className="DeviceTitle">iOS</p>
            {ios}
          </div>
          <div className="Device">
            <p className="DeviceTitle">Android</p>
            {android}
          </div>
        </div>
      </div>
    );
  };

  clearSearch = () => {
    this.setState({ search: "" });
  };

  handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ search: event.currentTarget.value });
  };

  assignRef = (name: string, ref: any) => {
    // @ts-ignore
    // tslint:disable-next-line
    this[name] = ref;
  };

  scroll = (name: string) => {
    try {
      // @ts-ignore
      ReactDOM.findDOMNode(this[name]).scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    } catch (err) {
      console.warn(
        `Tried to find and scroll to DOM node using ref ${name} but failed...`,
      );
    }
  };

  updateWindowDimensions = () => {
    this.setState({ desktop: isDesktop() });
  };

  fetchScreenshotsData = async () => {
    const iosData = await this.fetchData("ios");
    const androidData = await this.fetchData("android");

    if (iosData && androidData) {
      const processedData = processScreenshotsData(iosData, androidData);
      this.setState({
        loading: false,
        data: processedData,
        dates: {
          ios: iosData.timestamp,
          android: androidData.timestamp,
        },
        names: processedData.map(({ name }) => name),
      });
    } else {
      console.log("Error fetching iOS and Android screenshots data!");
      this.setErrorState();
    }
  };

  fetchData = async (
    source: "ios" | "android",
  ): Promise<ScreenshotsData | void> => {
    try {
      const result = await fetch(
        `${process.env.PUBLIC_URL}/${source}-data.json`,
        {
          headers: {
            pragma: "no-cache",
            "cache-control": "no-cache",
          },
        },
      );
      const json: ScreenshotsData = await result.json();
      return json;
    } catch (err) {
      console.log(
        `Could not fetch screenshots source JSON for device: ${source}`,
      );
      this.setErrorState();
    }
  };

  componentWillUnmount(): void {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  setErrorState = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };
}
