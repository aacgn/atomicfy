import { Atomic, storeData, mapContextStore } from "@aacgn/atomic";

import Router from "./router/index";

import "./global.css";

new Atomic(
    Router,
    document.getElementById("root")
);

const appContextStore = mapContextStore("app") || {};

storeData("app", {
    ...appContextStore,
    authorizedUser: window.localStorage.getItem("authorizedUser") ? JSON.parse(window.localStorage.getItem("authorizedUser")) : null
});