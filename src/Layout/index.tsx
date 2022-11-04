import React from "react";
import {
  Epic,
  Group,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  SplitCol,
  SplitLayout,
  useAdaptivity,
  usePlatform,
  View,
  ViewWidth,
  VKCOM,
} from "@vkontakte/vkui";

import router from "../TS/store/router";

import DesktopNavPanel from "./DesktopNavPanel";
import MobileTabbar from "./MobileTabbar";

const Layout = () => {
  const platform = usePlatform();
  const { viewWidth } = useAdaptivity();

  const hasHeader = platform !== VKCOM;
  const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;

  return (
    <SplitLayout
      style={{
        justifyContent: "center"
      }}
      header={hasHeader && <PanelHeader separator={false} />}
    >
      {isDesktop && <DesktopNavPanel />}

      <SplitCol
        animate={!isDesktop}
        spaced={isDesktop}
        width={isDesktop ? "55vw" : "100%"}
        maxWidth={isDesktop ? "55vw" : "100%"}
      >
        <PanelHeader
          after={
            !isDesktop &&
            router.activePanel !== null && (
              <PanelHeaderBack
                onClick={(): void => {
                  router.activePanel = null;
                }}
              />
            )
          }
        >
          {!isDesktop && "MPT Assistant"}
        </PanelHeader>

        <Epic
          id="default"
          activeStory={router.activeView}
          tabbar={!isDesktop && <MobileTabbar />}
        >
          <View id="" activePanel="default">
            <Panel id="default" children={<Group>Hello, world!</Group>} />
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};

export default Layout;
