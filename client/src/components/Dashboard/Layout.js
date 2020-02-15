import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const links = [
  {
    to: "#",
    text: "Home",
    icon: "lni-home"
  },
  {
    to: "#",
    text: "Files",
    icon: "lni-bookmark-alt"
  },
  {
    to: "#",
    text: "Account",
    icon: "lni-user"
  }
];

const Sidebar = () => {
  /**
 *   Setup styles for the following behavior:
       On desktop: sidebar left, and "open" by default
             Toggle button can minimize it
            When minimized, hover will open it, hoverOut will minimize it
        On mobile: sidebar becomes bottom nav
 */

  const nav = {
    base: "bg-teal-500 text-white flex flex-col py-4",
    pcMin: "w-16",
    pcMax: "w-40"
  };

  return (
    <nav className="bg-teal-500 text-white flex flex-col py-4 w-16 md:w-40">
      <div className="text-lg uppercase flex flex-col">
        {links.map((link, index) => (
          <Link
            to={link.to}
            className="my-2 py-4 px-4 flex items-center hover:bg-teal-300"
            key={`sidebar-navlink-${link.text}`}
          >
            <i className={`${link.icon} text-3xl md:text-lg md:mr-4`} />
            <span className="hidden invisible md:inline md:visible">
              {link.text}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

const NavBar = () => {
  const ref = useRef();

  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);

  useOnClickOutside(ref, () => setUserDropdownOpen(false));

  return (
    <nav className="bg-teal-500 flex items-center justify-between py-4 px-6 w-screen">
      <Link to="/" className="flex items-center flex-shrink-0 text-white mr-6">
        <svg
          className="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
        <span className="font-semibold text-xl tracking-tight">
          PERN Starter
        </span>
      </Link>

      <div className="relative" ref={ref}>
        <button
          onClick={() => setUserDropdownOpen(!isUserDropdownOpen)}
          className="h-12 w-12 rounded-full bg-gray-400 text-white flex items-center justify-center cursor-pointer shadow"
        >
          {isUserDropdownOpen ? (
            <i className="lni-close text-sm" />
          ) : (
            <i className="lni-user text-2xl" />
          )}
        </button>
        {isUserDropdownOpen && (
          <div className="flex flex-col bg-gray-100 shadow p-4 w-40 absolute right-0">
            <Link
              to="/logout"
              className="flex items-center justify-between p-4 rounded hover:bg-gray-200"
            >
              <i className="lni-exit mr-2" />
              Sign Out
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

const Layout = props => {
  const user = useSelector(store => store.user);
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex">
        <Sidebar />
        <section className="p-10 flex-grow">{props.children}</section>
      </div>
    </div>
  );
};

export default Layout;
