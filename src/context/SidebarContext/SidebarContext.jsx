import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const SidebarContext = createContext();

export const SidebarContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

SidebarContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  fetchUser: PropTypes.bool,
};
