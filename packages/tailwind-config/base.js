export const theme = {
  screens: {
    mobile: "360px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1440px",
  },
  extend: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
    },
    maxWidth: {
      app: "1440px",
    },
    fontFamily: {
      sans: ["Arial", "Helvetica", "sans-serif"],
      mono: [
        "SFMono-Regular",
        "Consolas",
        "Liberation Mono",
        "monospace",
      ],
    },
  },
};

export function createBaseConfig({ content = [], presets = [] } = {}) {
  return {
    content,
    presets,
    theme,
  };
}
