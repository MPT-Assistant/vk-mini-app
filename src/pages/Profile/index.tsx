import React from "react";
import {
  Avatar,
  Group,
  Header,
  SimpleCell,
  Switch,
  Title,
} from "@vkontakte/vkui";
import { observer } from "mobx-react";
import session from "../../TS/store/session";
import { Icon28CalendarOutline, Icon28Users } from "@vkontakte/icons";
import moment from "moment";
import router from "../../TS/store/router";

const Profile = () => {
  return (
    <>
      <Group>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Avatar size={96} src={session.user.photo} />
          <Title
            style={{ marginBottom: 8, marginTop: 20, fontSize: 24 }}
            level="3"
            weight="2"
          >
            {session.user.name} {session.user.surname}
          </Title>
        </div>
        <SimpleCell
          before={<Icon28Users />}
          onClick={() => {
            router.activeModal = "group-select-card";
          }}
        >
          Группа: {session.user.group || "Не установлена"}
        </SimpleCell>
        <SimpleCell disabled before={<Icon28CalendarOutline />}>
          Дата регистрации:{" "}
          {moment(session.user.regDate).format("DD.MM.YYYY, HH:mm:ss")}
        </SimpleCell>
      </Group>
      {/* <Group>
        <Header mode="secondary">Настройки</Header>
        <SimpleCell
          hasActive={false}
          hasHover={false}
          after={<Switch checked={session.user.mailings.replacements} />}
        >
          Уведомления о заменах
        </SimpleCell>
      </Group> */}
    </>
  );
};

export default observer(Profile);
