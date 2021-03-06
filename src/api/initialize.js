// API Utils
import webpackModules from "webpackModules";
import commonModules from "commonModules";
import internalModules from "internalModules";
import settings from "./ui/settings/settings";
import * as utils from "utils";
import * as patcher from "patcher";
import * as websocket from "websocket";
import * as toasts from "toasts";
import * as modals from "modals";
import * as devmode from "devmode";
import * as components from "components";

// Plugin management
import * as plugins from "plugins";

function uninject() {
  plugins.unloadAllPlugins();
  websocket.uninitializeSocket();
  patcher.unpatchAll();
  toasts.uninitializeToasts();
  patcher.unpatchAllCss();

  window.HydroCord = undefined;
  delete window.HydroCord;
  return true;
}

async function initializeAPI() {
  utils.logger.log("Initializing HydroCord API");

  window.HydroCord = {
    uninject,
    modules: {
      webpackModules,
      webpack: webpackModules,
      common: commonModules,
      internal: internalModules,
    },
    plugins: {
      importPlugin: plugins.importPlugin,
      removePlugin: plugins.removePlugin,
      togglePlugin: plugins.togglePlugin,
    },
    patcher: {
      before: patcher.before,
      after: patcher.after,
      instead: patcher.instead,
      injectCSS: patcher.injectCSS,
    },
    ui: {
      toasts: {
        showToast: toasts.showToast,
      },
      modals: {
        showConfirmationModal: modals.showConfirmationModal,
      },
      components: {
        ErrorBoundary: components.ErrorBoundary,
      }
    },
    utils: {
      logger: utils.logger,
      findInTree: utils.findInTree,
      findInReactTree: utils.findInReactTree,
      getReactInstance: utils.getReactInstance,
      getOwnerInstance: utils.getOwnerInstance,
      sleep: utils.sleep,
      useNest: utils.useNest,
      copyText: utils.copyText
    },
    cum: () => utils.logger.log("8==D ~~~~~~")
  };

  // Native-only APIs
  if (window["DiscordNative"]) {
    window.HydroCord["dev"] = {
      toggleDevMode: devmode.toggleDevMode,
      showSettings: devmode.showSettings,
    }
  }
  
  // Inject error boundary CSS
  patcher.injectCSS(`.HydroCord-error-handler{font-family: var(--font-display);color:var(--text-normal);padding:16px}.HydroCord-error-handler-title{margin-bottom:7px;font-weight:bold;font-size:24px}.HydroCord-error-handler-code{background-color:var(--background-secondary);font-family:var(--font-code);user-select:text}`);
  
  toasts.initializeToasts();
  await plugins.initializePluginStore();
  settings.initializeSettings();
  window.HydroCord.plugins.installed = plugins.pluginCache;
  window.HydroCord.plugins.loaded = plugins.loadedPlugins;
  await plugins.initializePlugins();
  websocket.initializeSocket();
  utils.logger.log("HydroCord is injected!");
}

export default initializeAPI;
