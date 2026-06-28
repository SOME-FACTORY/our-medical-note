export const theme = {
  extend: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
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
