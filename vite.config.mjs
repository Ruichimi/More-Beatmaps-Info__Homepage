import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    root: path.resolve(__dirname, "src"),

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@assets": path.resolve(__dirname, "src/assets"),
            "@scss": path.resolve(__dirname, "src/styles/scss"),
        },
    },

    plugins: [
        tailwindcss(),
    ],

    build: {
        outDir: path.resolve(__dirname, "dist"),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, "src/index.html"),
                feedback: path.resolve(__dirname, "src/feedback.html"),
                privacy: path.resolve(__dirname, "src/privacy.html"),
            },
        },
    },
});
