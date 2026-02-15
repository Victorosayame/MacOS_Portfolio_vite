/**
 * STEP 27: Finder Window - File/Folder Browser
 * ===============================================
 * Mimics macOS Finder for browsing portfolio content:
 * - Left sidebar: Navigation with favorite locations and projects
 * - Main content area: Shows files/folders in current location
 * - Supports different file types (folders, PDFs, images, text files, etc.)
 * - Click handlers for different file types:
 *   - PDFs: Open in Resume window
 *   - Folders: Navigate into folder (update activeLocation)
 *   - URLs: Open in new browser tab
 *   - Images/Text: Open in respective viewer windows
 *
 * Data Source: From constants file (locations object with folder structure)
 */
import { WindowControls } from "#components";
import { locations } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import useLocationStore from "#store/loaction";
import useWindowStore from "#store/window";
import clsx from "clsx";
import { Search } from "lucide-react";
import React from "react";

const Finder = () => {
  // STEP 28: Access Location Store
  // Get current folder and setActiveLocation function for folder navigation
  const { activeLocation, setActiveLocation } = useLocationStore();
  // STEP 30: Access Window Store
  // Get openWindow function to open files in their respective viewer windows
  const { openWindow } = useWindowStore();

  //map items to make our jsx look cleaner
  const renderList = (items) =>
    items.map((item) => (
      <li
        key={item.id}
        onClick={() => setActiveLocation(item)}
        className={clsx(
          item.id === activeLocation.id ? "active" : "not-active",
        )}
      >
        <img src={item.icon} className="w-4" alt={item.name} />
        <p className="text-sm font-medium truncate">{item.name}</p>
      </li>
    ));

  /**
   * STEP 29: File Click Handler - openItem()
   * =========================================
   * Routes clicks on different file types to appropriate handlers:
   * - PDF files: Opens in Resume window
   * - Folders: Updates activeLocation to navigate into folder
   * - URLs (with href): Opens in new browser tab
   * - Figma files (fig type): Opens in new tab via href
   * - Other files: Opens in appropriate viewer (text, image, etc.)
   *
   * This enables the Finder to act as a true file browser with
   * appropriate handlers for each file type.
   */
  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    //
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    openWindow(`${item.fileType}${item.kind}`, item);
  };
  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          <div>
            <h3>Favorite</h3>
            <ul>{renderList(Object.values(locations))}</ul>
          </div>
          <div>
            <h3>My Projects</h3>
            <ul>{renderList(locations.work.children)}</ul>
          </div>
        </div>
        <ul className="content">
          {activeLocation?.children.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
