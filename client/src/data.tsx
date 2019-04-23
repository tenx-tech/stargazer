import React from "react";

import Android_ScreenshotData from "./screenshots/android-data.json";
import iOS_ScreenshotData from "./screenshots/ios-data.json";

/* =============================================================================
Types and Config
============================================================================= */

interface PhotoData {
  name: string;
  screenshot: string;
}

interface ScreenshotsData {
  data: {
    width: number;
    height: number;
    os: string;
    photos: ReadonlyArray<PhotoData>;
  };
  timestamp: string;
}

const ANDROID_SCREENSHOTS = Android_ScreenshotData as ScreenshotsData;
const IOS_SCREENSHOTS = iOS_ScreenshotData as ScreenshotsData;

/* =============================================================================
Validation
--------------------------------------------------------------------------------
- Perform some initial validation on the input data.
============================================================================= */

{
  if (ANDROID_SCREENSHOTS.data.photos.length === 0) {
    console.warn(
      `Found zero photos in the Android screenshots data, did you run the Stargazer tool first to record screenshots for your app?`,
    );
  }

  if (IOS_SCREENSHOTS.data.photos.length === 0) {
    console.warn(
      `Found zero photos in the iOS screenshots data, did you run the Stargazer tool first to record screenshots for your app?`,
    );
  }
}

/* =============================================================================
Helpers to process the screenshot data for rendering in the Photobooth App.
============================================================================= */

/**
 * Resize images to 75%.
 */
const IMAGE_RESIZE = 0.75;

const Placeholder = ({ height, width }: { height: number; width: number }) => (
  <div
    className="Placeholder"
    style={{
      height: height * IMAGE_RESIZE,
      width: width * IMAGE_RESIZE,
    }}
  >
    <p className="PlaceholderText">No Image Yet</p>
  </div>
);

const Data = new Map();

/**
 * Some imperative code... this could surely be more elegant
 * but... hey it's good for now.
 *
 * Combine iOS and Android image data into one array which can
 * be mapped over to render the same screens side-by-side, with
 * some extra logic to avoid failing in the case that both
 * screenshots do not exist yet.
 */

{
  /* Map iOS Screenshots */
  const { os, width, height, photos } = IOS_SCREENSHOTS.data;

  photos.forEach(({ name, screenshot }: PhotoData) => {
    Data.set(name, {
      [os]: (
        <img
          height={height * IMAGE_RESIZE}
          width={width * IMAGE_RESIZE}
          alt={name}
          src={screenshot}
          className="ScreenImage"
        />
      ),
    });
  });
}

{
  /* Map Android Screenshots */
  const { os, width, height, photos } = ANDROID_SCREENSHOTS.data;

  photos.forEach(({ name, screenshot }: PhotoData) => {
    const entry = Data.get(name);
    Data.set(name, {
      ios: (entry && entry.ios) || (
        <Placeholder
          height={IOS_SCREENSHOTS.data.height * IMAGE_RESIZE}
          width={IOS_SCREENSHOTS.data.width * IMAGE_RESIZE}
        />
      ),
      [os]: (
        <img
          height={height * IMAGE_RESIZE}
          width={width * IMAGE_RESIZE}
          alt={name}
          src={screenshot}
          className="ScreenImage"
        />
      ),
    });
  });
}

export interface ScreenshotItem {
  name: string;
  data: {
    ios: any;
    android: any;
  };
}

/* Convert to an array and add placeholders for any missing Android screenshots */
export default Array.from(Data.entries()).map(([name, { ios, android }]) => {
  const result: ScreenshotItem = {
    name,
    data: {
      ios,
      android: android || (
        <Placeholder
          height={ANDROID_SCREENSHOTS.data.height * IMAGE_RESIZE}
          width={ANDROID_SCREENSHOTS.data.width * IMAGE_RESIZE}
        />
      ),
    },
  };

  return result;
});

/* Return recorded timestamps for screenshots */
export const getTimestamp = () => {
  const ios = new Date(IOS_SCREENSHOTS.timestamp);
  const android = new Date(ANDROID_SCREENSHOTS.timestamp);

  return {
    ios,
    android,
  };
};
