import App from "./App.svelte";
import "./locales/i18n";

const app = new App({
    target: document.getElementById("app"),
});

export default app;