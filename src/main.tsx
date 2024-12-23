/* eslint-disable react-refresh/only-export-components */
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { KcPage } from "./kc.gen";
import faviconDamia from "../public/favicon-damia.png";
import faviconMeta from "../public/favicon-meta.png";

// The following block can be uncommented to test a specific page with `yarn dev`
// Don't forget to comment back or your bundle size will increase
/*
import { getKcContextMock } from "./login/KcPageStory";

if (import.meta.env.DEV) {
    window.kcContext = getKcContextMock({
        pageId: "register.ftl",
        overrides: {}
    });
}
*/

if (window.kcContext?.themeName === "meta") {
    document.head.insertAdjacentHTML(
        "beforeend",
        `<link rel="icon" type="image/png" href="${faviconMeta}" />`
    );
} else {
    document.head.insertAdjacentHTML(
        "beforeend",
        `<link rel="icon" type="image/png" href="${faviconDamia}" />`
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        {!window.kcContext ? (
            <h1>No Keycloak Context</h1>
        ) : (
            <KcPage kcContext={window.kcContext} />
        )}
    </StrictMode>
);
