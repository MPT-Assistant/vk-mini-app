import React from "react";
import {
  SplitCol,
  PanelHeader,
  Group,
  Cell,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import { observer } from "mobx-react";
import router from "../TS/store/router";
import { Icon28CubeBoxOutline } from "@vkontakte/icons";

const DesktopNavPanel = () => {
  const activeViewStyle: React.CSSProperties = {
    backgroundColor: "var(--button_secondary_background)",
    borderRadius: 8,
  };

  return (
    <SplitCol fixed width={"20vw"} maxWidth={"20vw"}>
      <PanelHeader separator>MPT Assistant</PanelHeader>
      <Group>
        <Cell
          onClick={(): void => {
            router.activeView = "";
          }}
          hasActive={router.activeView !== ""}
          hasHover={router.activeView !== ""}
          style={router.activeView === "" ? activeViewStyle : {}}
          before={<Icon28CubeBoxOutline />}
          after={
            router.activeView === "" &&
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
          Главная
        </Cell>
      </Group>
    </SplitCol>
  );
};

export default observer(DesktopNavPanel);
