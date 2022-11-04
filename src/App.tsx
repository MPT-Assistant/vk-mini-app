import React, { useState } from "react";

import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  WebviewType,
} from "@vkontakte/vkui";
import Layout from "./Layout";

import "./CSS/index.css";
import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/dist/unstable.css";
import "@vkontakte/vkui/dist/fonts.css";
import { AppearanceType } from "@vkontakte/vk-bridge";

const App = () => {
  const [appearance, setAppearance] = useState<AppearanceType>("dark");

  return (
    <ConfigProvider
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

export default App;
