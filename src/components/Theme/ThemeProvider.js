import React, { useContext } from "react";
import { darkTheme } from "@/constants/styles/darkTheme";
import { lightTheme } from "@/constants/styles/lightTheme";

export const ThemeContext = React.createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = React.useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prev) => (prev === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
