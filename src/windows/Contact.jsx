/**
 * STEP 35: Contact Window - Social Links Display
 * ================================================
 * Displays contact information and social media links:
 * - Profile image
 * - Contact introduction text
 * - Email address
 * - Social media links with icons (GitHub, LinkedIn, Twitter, etc.)
 * - Links open in new browser tabs
 *
 * Data Source: socials array from constants
 */

import { WindowControls } from "#components";
import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className="p-5 space-y-5">
        <img
          src="/images/adrian.jpg"
          alt="Name"
          className="w-20 rounded-full"
        />

        <h3>Let's Connect</h3>
        <p>Got an idea? A bug to squash? Or just wanna talk tech? I'm in.</p>
        <p>contact@bishopcodes.pro</p>

        <ul>
          {socials.map(({ id, bg, link, icon, text }) => (
            <li
              key={id}
              style={{
                backgroundColor: bg,
              }}
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}
              >
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
