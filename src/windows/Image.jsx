/**
 * STEP 33: Image File Viewer Window
 * ===================================
 * Displays image files in a dedicated viewer window:
 * - Shows full-size images with proper scaling
 * - Handles missing data gracefully (returns null)
 * - Displays file name and icon in window header
 */

import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const Image = () => {
  // STEP 34: Extract Image Data from Window Store
  // Gets image URL and metadata from the window state
  const { windows } = useWindowStore();

  const data = windows.imgfile?.data;

  if (!data) return null;

  const { name, imageUrl } = data;
  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{name}</h2>
      </div>

      <div className="p-5 bg-white">
        {imageUrl ? (
          <div className="w-full">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-auto max-h-[70vh] object-contain rounded"
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow;
