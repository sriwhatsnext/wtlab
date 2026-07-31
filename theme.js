

// Explicit state flag. Default = light mode (false).
let isDarkMode = false;

// The two full sets of theme values.
const lightTheme = {
  "--bg": "#ffffff",
  "--surface": "#f6f6f6",
  "--surface2": "#eeeeee",
  "--border": "#dcdcdc",
  "--text": "#111111",
  "--secondary": "#5a5a5a",
  "--accent-bg": "#111111",
  "--accent-text": "#ffffff",
  "--card-hover-border": "#111111",
  "--img-filter": "grayscale(100%)"
};

const darkTheme = {
  "--bg": "#050505",
  "--surface": "#101010",
  "--surface2": "#171717",
  "--border": "#262626",
  "--text": "#f5f5f5",
  "--secondary": "#9c9c9c",
  "--accent-bg": "#ffffff",
  "--accent-text": "#000000",
  "--card-hover-border": "#ffffff",
  "--img-filter": "grayscale(100%)"
};

// Applies a given theme object directly onto the root element's
// style property (documentElement.style.setProperty), one custom
// property at a time. This is direct DOM/style manipulation,
// not a class toggle.
function applyTheme(themeValues) {
  const root = document.documentElement;

  for (const property in themeValues) {
    root.style.setProperty(property, themeValues[property]);
  }
}

// Updates the toggle button's own DOM properties (text + aria label)
// directly, without relying on CSS classes.
function updateToggleButton(button) {
  if (isDarkMode) {
    button.textContent = "☀️";
    button.setAttribute("aria-label", "Switch to light mode");
    button.title = "Switch to light mode";
  } else {
    button.textContent = "🌙";
    button.setAttribute("aria-label", "Switch to dark mode");
    button.title = "Switch to dark mode";
  }
}

function initThemeSwitcher() {
  const toggleButton = document.getElementById("theme-toggle-btn");
  if (!toggleButton) return;

  // Make sure we start in light mode explicitly (in case the
  // browser cached inline styles from a previous session state
  // held only in memory - we always begin fresh at light mode
  // per the assignment requirement).
  isDarkMode = false;
  applyTheme(lightTheme);
  updateToggleButton(toggleButton);

  toggleButton.addEventListener("click", function () {
    // Manual if / else state flip - deliberately avoids toggle().
    if (isDarkMode === false) {
      isDarkMode = true;
      applyTheme(darkTheme);
    } else {
      isDarkMode = false;
      applyTheme(lightTheme);
    }

    updateToggleButton(toggleButton);
  });
}

document.addEventListener("DOMContentLoaded", initThemeSwitcher);
