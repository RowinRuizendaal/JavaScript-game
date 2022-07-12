import { addMessages, getLocaleFromNavigator, init } from "svelte-i18n";

import en from "./en.json";
import nl from "./nl.json";

addMessages("en", en);
addMessages("nl", nl);

init({
    fallbackLocale: "en",
    initialLocale: getLocaleFromNavigator(),
});