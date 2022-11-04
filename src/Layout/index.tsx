import React, { useMemo } from "react";
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
import { observer } from "mobx-react";

import SchedulePage from "../pages/Schedule";
import ProfilePage from "../pages/Profile";

const Layout = () => {
  const platform = usePlatform();
  const { viewWidth } = useAdaptivity();

  const hasHeader = platform !== VKCOM;
  const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;

  const activePanelName = useMemo(() => {
    if (!isDesktop) {
      return "MPT Assistant";
    } else {
      switch (router.activeView) {
        case "schedule":
          return "Расписание";
        case "profile":
          return "Профиль";

        default:
          return "MPT Assistant";
      }
    }
  }, [router.activeView]);

  return (
    <SplitLayout
      style={{
        justifyContent: "center",
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
        <Epic
          id="default"
          activeStory={router.activeView}
          tabbar={!isDesktop && <MobileTabbar />}
        >
          <View id="schedule" activePanel="default">
            <Panel id="default">
              <PanelHeader separator={false} children="Расписание" />
              <SchedulePage />
            </Panel>
          </View>
          <View id="profile" activePanel="default">
            <Panel id="default">
              <PanelHeader separator={false} children="Профиль" />
              <ProfilePage />
            </Panel>
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};

export default observer(Layout);
