import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Retrieve the theme from local storage or default to light theme
  const storedDarkTheme = localStorage.getItem("darkTheme");
  const [isDarkTheme, setIsDarkTheme] = useState(
    storedDarkTheme ? JSON.parse(storedDarkTheme) : false
  );
  const [searchTerm, setSearchTerm] = useState("cat");

  // Apply the theme on initial mount
  useEffect(() => {
    const body = document.querySelector("body");
    if (isDarkTheme) {
      body.classList.add("dark-theme");
    } else {
      body.classList.remove("dark-theme");
    }
  }, [isDarkTheme]);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);

    const body = document.querySelector("body");
    if (newDarkTheme) {
      body.classList.add("dark-theme");
      localStorage.setItem("darkTheme", true);
    } else {
      body.classList.remove("dark-theme");
      localStorage.setItem("darkTheme", false);
    }
  };

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGLobalContext = () => useContext(AppContext);
