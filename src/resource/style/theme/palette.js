export default {
    getPaletteFromColors(colors) {
        return {
            ...this.getMainColors(colors),
            contrastThreshold: 3,
        };
    },

    getMainColors(colors) {
        return {
            primary: { main: colors.primary },
            secondary: { main: colors.secondary },
            default: { main: colors.primary },
        };
    },
};
