import React, { useMemo } from "react";
import {
  Button,
  Epic,
  Group,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
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

import { Icon56UsersOutline } from "@vkontakte/icons";

import session from "../TS/store/session";
import Modal from "./modal";

import SchedulePage from "../pages/Schedule";
import ProfilePage from "../pages/Profile";
import ReplacementsPage from "../pages/Replacements";

const Layout = () => {
  const platform = usePlatform();
  const { viewWidth } = useAdaptivity();

  const hasHeader = platform !== VKCOM;
  const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;

  return (
    <SplitLayout
      style={{
        justifyContent: "center",
      }}
      header={hasHeader && <PanelHeader separator={false} />}
      modal={<Modal />}
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
              {session.user.group ? (
                <SchedulePage />
              ) : (
                <Group>
                  <Placeholder
                    icon={<Icon56UsersOutline />}
                    header="У вас не установлена группа"
                  >
                    Необходимо установить группу в профиле
                  </Placeholder>
                </Group>
              )}
            </Panel>
          </View>
          <View id="replacements" activePanel="default">
            <Panel id="default">
              <PanelHeader separator={false} children="Замены" />
              {session.user.group ? (
                <ReplacementsPage />
              ) : (
                <Group>
                  <Placeholder
                    icon={<Icon56UsersOutline />}
                    header="У вас не установлена группа"
                  >
                    Необходимо установить группу в профиле
                  </Placeholder>
                </Group>
              )}
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
