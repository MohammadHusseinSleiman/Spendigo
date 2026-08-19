export function applyTheme(isDark) {
    document.documentElement.classList.toggle(
        "dark",
        Boolean(isDark)
    );

    localStorage.setItem(
        "dark_mode",
        Boolean(isDark)
    );
}

export function getStoredTheme() {
    return (
        localStorage.getItem("dark_mode") === "true"
    );
}