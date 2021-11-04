import webpackModules from "webpackModules";
import { after, injectCSS } from "patcher";
import Plugins from "./components/Plugins.jsx";

export default {
  initializeSettings: function () {
    // All patcher.injectCSS calls are uninjected when HydroCord.uninject() is called, so this is never changed
    injectCSS(`.HydroCord-plugin-card{padding:16px;margin-bottom:10px;border-style: none}.HydroCord-plugin-import{flex-grow:1;margin-right:20px}.HydroCord-plugin-divider{margin-top:20px;margin-bottom:20px}.HydroCord-card-header{display:inline-block}.HydroCord-card-author,.HydroCord-card-title{display:inline}.HydroCord-card-right{display:flex}.HydroCord-card-buttons{display:flex;margin-right:4px}.HydroCord-card-buttons>*{fill:var(--interactive-normal);cursor:pointer;width:20px}.HydroCord-card-buttons>*:hover{fill:var(--interactive-hover)}.HydroCord-card-description{padding-top:3px;overflow-wrap:break-word}.HydroCord-card-copy{width:18px}`);

    const Settings = webpackModules.findByDisplayName("SettingsView");

    // Same goes for patching JS, it'll be uninjected when HydroCord.uninject() is called
    after("getPredicateSections", Settings.prototype, (args, items) => {
      const position = items.findIndex((item) => { return item.section == "changelog" }) - 1;

      // Check if we're in the user settings menu, if not, fuck off
      if (position < 0) return items;

      const HydroCordSettings = [
        { section: "DIVIDER" },
        { section: "HEADER", label: "Test" },
        { section: "DIVIDER" },
        { section: "HEADER", label: "HydroCord" },
        { section: "HydroCord_PLUGINS", label: "Plugins", element: Plugins }
      ];
      items.splice(position, 0, ...HydroCordSettings)

      return items;
    });
  }
}