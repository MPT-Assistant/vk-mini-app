import React, { useEffect, useState } from "react";

import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  platform,
  Platform,
  WebviewType,
} from "@vkontakte/vkui";
import Layout from "./Layout";

import "./CSS/index.css";
import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/dist/unstable.css";
import "@vkontakte/vkui/dist/fonts.css";
import bridge, {
  AppearanceType,
  VKUpdateConfigData,
} from "@vkontakte/vk-bridge";
import { SMALL_TABLET_SIZE } from "@vkontakte/vkui/dist/components/AdaptivityProvider/AdaptivityProvider";
import api from "./TS/api";
import session from "./TS/store/session";
import { observer } from "mobx-react";

function currentPlatform(): Platform {
  if (
    window.innerWidth >= SMALL_TABLET_SIZE &&
    window.matchMedia("(orientation: landscape)").matches
  ) {
    return Platform.VKCOM;
  }

  return platform() as Platform;
}

const App = () => {
  const [platform, setPlatform] = useState<Platform>(currentPlatform());
  const [appearance, setAppearance] = useState<AppearanceType>("dark");

  useEffect((): void => {
    function updateConfig({ appearance }: VKUpdateConfigData) {
      if (appearance) setAppearance(appearance);
    }

    bridge.send("VKWebAppGetConfig").then((config) => {
      updateConfig(config as VKUpdateConfigData);
    });
    bridge.subscribe(async ({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        updateConfig(data as VKUpdateConfigData);
      }
    });
  }, []);

  useEffect(() => {
    function onResize(): void {
      setPlatform(currentPlatform());
    }

    window.addEventListener("resize", onResize, false);
    return () => window.removeEventListener("resize", onResize, false);
  }, []);

  useEffect(() => {
    void (async () => {
      const launchParams = await bridge.send("VKWebAppGetLaunchParams");
      session.launchParams = launchParams;
      const user = await api.app.getUser();
      const [userInfo] = await api.app.getUsersInfo([user.id]);
      session.user = { ...user, ...userInfo };
      await bridge.send("VKWebAppInit");
    })();
  }, []);

  return (
    <ConfigProvider
      platform={platform}
      appearance={appearance}
      webviewType={WebviewType.INTERNAL}
      transitionMotionEnabled={false}
    >
      <AdaptivityProvider>
        <AppRoot mode="full">
          <Layout />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default observer(App);
