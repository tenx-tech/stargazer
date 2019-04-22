import React, { Component } from "react";
import ReactDOM from "react-dom";

import ScreenshotData, {
  getTimestamp,
  ScreenshotItem,
} from "../../client/src/data";
import logo from "./tenx_logo.png";

/* =============================================================================
Types and Config
============================================================================= */

interface IState {
  search: string;
  desktop: boolean;
  names: ReadonlyArray<string>;
}

/**
 * Get dates for screenshots
 */
const dates = getTimestamp();

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
      search: "",
      desktop: isDesktop(),
      names: ScreenshotData.map(({ name }) => name),
    };
  }

  componentDidMount(): void {
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount(): void {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  render(): JSX.Element {
    const DESKTOP = this.state.desktop;
    return (
      <div className="App">
        <header className="AppHeader">
          <img src={logo} className="AppLogo" alt="logo" />
          <p className="HeaderTitle">TenX React Native Screen Browser</p>
          {DESKTOP && (
            <a
              target="_blank"
              className="GitHub"
              rel="noopener noreferrer"
              href="https://github.com/tenx-tech/tenx-react-native/issues/new?labels=design-feedback"
            >
              Open an Issue on GitHub
            </a>
          )}
        </header>
        {DESKTOP && (
          <div className="TimestampBlock">
            <p>
              iOS updated on <b>{dates.ios.toDateString()}</b>.
            </p>
            <p>
              Android updated on <b>{dates.android.toDateString()}</b>.
            </p>
          </div>
        )}
        {DESKTOP && (
          <div className="SideBar">
            <div className="SearchBar">
              <input
                autoFocus
                placeholder={`Filter (${ScreenshotData.length} total screens)`}
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
          {ScreenshotData.map(data => {
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
}
