import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "dark", toggle: () => { } });

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem("theme") || "dark";
        } catch {
            return "dark";
        }
    });

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("dark", "light");
        root.classList.add(theme);
        try {
            localStorage.setItem("theme", theme);
        } catch {
            /* storage unavailable — theme still applies for this visit */
        }
    }, [theme]);

    const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

    return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
