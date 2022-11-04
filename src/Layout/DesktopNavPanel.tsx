import React from "react";
import {
  SplitCol,
  PanelHeader,
  Group,
  Cell,
  PanelHeaderBack,
  Spacing,
} from "@vkontakte/vkui";
import { observer } from "mobx-react";
import router from "../TS/store/router";
import { Icon28CubeBoxOutline, Icon28Profile } from "@vkontakte/icons";

const DesktopNavPanel = () => {
  const activeViewStyle: React.CSSProperties = {
    backgroundColor: "var(--button_secondary_background)",
    borderRadius: 8,
  };

  return (
    <SplitCol fixed width={"35vw"} maxWidth={"35vw"}>
      <PanelHeader separator>MPT Assistant</PanelHeader>
      <Group>
        <Cell
          onClick={(): void => {
            router.activeView = "schedule";
          }}
          hasActive={router.activeView !== "schedule"}
          hasHover={router.activeView !== "schedule"}
          style={router.activeView === "schedule" ? activeViewStyle : {}}
          before={<Icon28CubeBoxOutline />}
          after={
            router.activeView === "schedule" &&
            router.activePanel !== null && (
              <PanelHeaderBack
                size={24}
                onClick={(): void => {
                  router.activePanel = null;
                }}
              />
            )
          }
        >
          Расписание
        </Cell>
        <Spacing />
        <Cell
          onClick={(): void => {
            router.activeView = "profile";
          }}
          hasActive={router.activeView !== "profile"}
          hasHover={router.activeView !== "profile"}
          style={router.activeView === "profile" ? activeViewStyle : {}}
          before={<Icon28Profile />}
          after={
            router.activeView === "profile" &&
            router.activePanel !== null && (
              <PanelHeaderBack
                size={24}
                onClick={(): void => {
                  router.activePanel = null;
                }}
              />
            )
          }
        >
          Профиль
        </Cell>
      </Group>
    </SplitCol>
  );
};

export default observer(DesktopNavPanel);
