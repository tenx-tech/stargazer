import React from "react";

/* =============================================================================
Types and Config
============================================================================= */

interface PhotoData {
  name: string;
  screenshot: string;
}

export interface ScreenshotsData {
  data: {
    width: number;
    height: number;
    os: string;
    photos: ReadonlyArray<PhotoData>;
  };
  timestamp: string;
}

export interface ScreenshotItem {
  name: string;
  data: {
    ios: any;
    android: any;
  };
}

/**
 * Resize images to 75%.
 */
const IMAGE_RESIZE = 0.75;

/* =============================================================================
Screenshot Processing Methods
============================================================================= */

export const processScreenshotsData = (
  iosData: ScreenshotsData,
  androidData: ScreenshotsData,
): ReadonlyArray<ScreenshotItem> => {
  if (androidData.data.photos.length === 0) {
    console.warn(
      `Found zero photos in the Android screenshots data, did you run the Stargazer tool first to record screenshots for your app?`,
    );
  }

  if (iosData.data.photos.length === 0) {
    console.warn(
      `Found zero photos in the iOS screenshots data, did you run the Stargazer tool first to record screenshots for your app?`,
    );
  }

  if (iosData.data.photos.length === 0 && iosData.data.photos.length === 0) {
    throw new Error("No photo data exists!");
  }

  const placeholderDimensions = getPlaceholderDimensions(iosData, androidData);

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
    /**
     * Map iOS Screenshots.
     */
    const { os, width, height, photos } = iosData.data;

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
    /**
     * Map Android Screenshots.
     */
    const { os, width, height, photos } = androidData.data;

    photos.forEach(({ name, screenshot }: PhotoData) => {
      const entry = Data.get(name);
      Data.set(name, {
        ios: (entry && entry.ios) || (
          <Placeholder
            height={placeholderDimensions.height * IMAGE_RESIZE}
            width={placeholderDimensions.width * IMAGE_RESIZE}
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

  /**
   * Convert to an array and add placeholders for any missing
   * Android screenshots.
   */
  return Array.from(Data.entries()).map(([name, { ios, android }]) => {
    const result: ScreenshotItem = {
      name,
      data: {
        ios,
        android: android || (
          <Placeholder
            height={placeholderDimensions.height * IMAGE_RESIZE}
            width={placeholderDimensions.width * IMAGE_RESIZE}
          />
        ),
      },
    };

    return result;
  });
};

/* =============================================================================
Helper UI
============================================================================= */

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

/**
 * Get whichever dimensions exists. One of them will exist.
 */
const getPlaceholderDimensions = (
  ios: ScreenshotsData,
  android: ScreenshotsData,
) => {
  try {
    return {
      height: ios.data.height,
      width: ios.data.width,
    };
  } catch (err) {
    return {
      height: android.data.height,
      width: android.data.width,
    };
  }
};
