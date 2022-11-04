import { Icon28CubeBoxOutline } from "@vkontakte/icons";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import React from "react";

import { observer } from "mobx-react";

import router from "../TS/store/router";

const MobileTabbar = () => {
  return (
    <Tabbar mode="vertical">
      <TabbarItem
        onClick={(): void => {
          router.activeView = "";
        }}
        selected={router.activeView === ""}
        disabled={router.activeView === "" && router.activePanel === null}
        text="Главная"
      >
        <Icon28CubeBoxOutline />
      </TabbarItem>
    </Tabbar>
  );
};

export default observer(MobileTabbar);
