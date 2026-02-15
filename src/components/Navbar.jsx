import dayjs from "dayjs";
import { navIcons, navLinks } from "#constants";
import useWindowStore from "#store/window";

/**
 * STEP 3: Create Navbar Component with Dynamic Content
 * ======================================================
 * The Navbar component serves as the application header and includes:
 * - Logo image and portfolio title
 * - Navigation links (Projects, Contact, Resume) rendered from constants
 * - System icons (WiFi, Search, User, Mode) for visual appeal
 * - Live date/time display using dayjs library for formatting
 *
 * Structure:
 * - Left section: Logo + navigation items
 * - Right section: Icons + current date/time (responsive, collapses on mobile)
 *
 * Features:
 * - All dynamic content imported from constants for easy maintenance
 * - Click handlers on nav links trigger window opening via global store
 * - Fully responsive design with max-xl breakpoints
 */

const Navbar = () => {
  // STEP 24: Add Quick Navigation to Windows via Navbar Links
  // Integrating useWindowStore to provide one-click access to main sections
  // Users can click navigation items to directly open windows instead of using dock
  const { openWindow } = useWindowStore();
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Victor's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className="max-xl:ml-4">
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} alt={`icon-${id}`} className="icon-hover" />
            </li>
          ))}
        </ul>

        <time className="max-xl:text-xs">
          {dayjs().format("ddd MMM D h:mm A")}
        </time>
      </div>
    </nav>
  );
};

export default Navbar;
