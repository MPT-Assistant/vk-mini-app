import { Icon28GridSquareOutline, Icon28Profile } from "@vkontakte/icons";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import React from "react";

import { observer } from "mobx-react";

import router from "../TS/store/router";

const MobileTabbar = () => {
  return (
    <Tabbar mode="vertical">
      <TabbarItem
        onClick={(): void => {
          router.activeView = "schedule";
        }}
        selected={router.activeView === "schedule"}
        disabled={
          router.activeView === "schedule" && router.activePanel === null
        }
        text="Расписание"
      >
        <Icon28GridSquareOutline />
      </TabbarItem>
      <TabbarItem
        onClick={(): void => {
          router.activeView = "profile";
        }}
        selected={router.activeView === "profile"}
        disabled={
          router.activeView === "profile" && router.activePanel === null
        }
        text="Профиль"
      >
        <Icon28Profile />
      </TabbarItem>
    </Tabbar>
  );
};

export default observer(MobileTabbar);
