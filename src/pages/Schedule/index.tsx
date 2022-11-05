import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import utils from "@rus-anonym/web-utils";
import {
  IWeek,
  IExtendedLesson,
} from "@mpt-assistant/api-wrapper";
import {
  RichCell,
  Group,
  List,
  Separator,
  Placeholder,
  Spinner,
  Calendar,
  useAdaptivity,
  ViewWidth,
  Header,
  Div,
} from "@vkontakte/vkui";
import { RichTooltip } from "@vkontakte/vkui/unstable";
import api from "../../TS/api";
import session from "../../TS/store/session";
import { autorun } from "mobx";
import moment from "moment";

import store from "./store";
import SelectDateButtons from "../../components/SelectDateButtons";

const Lesson = ({ lesson }: { lesson: IExtendedLesson }): JSX.Element => {
  return (
    <RichCell
      hasActive={false}
      hasHover={false}
      multiline
      text={lesson.teacher}
      before={`${lesson.num}.`}
      after={`${lesson.start} - ${lesson.end}`}
    >
      {lesson.name}
    </RichCell>
  );
};

const Week = ({ week }: { week: IWeek }): JSX.Element => {
  const { viewWidth } = useAdaptivity();
  const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
  const [isTooltipShown, setTooltipShown] = useState(false);

  return (
    <RichTooltip
      content={
        <Calendar
          value={store.date}
          onChange={(date) => (store.date = date || new Date())}
        />
      }
      shown={isDesktop ? undefined : isTooltipShown}
    >
      <RichCell
        onClick={isDesktop ? undefined : () => setTooltipShown(!isTooltipShown)}
        hasActive={false}
        hasHover={false}
        text={week.value}
        subhead="Дата"
      >
        {week.date}
      </RichCell>
    </RichTooltip>
  );
};

const Schedule = () => {
  useEffect(() => {
    return autorun(async () => {
      store.schedule = null;
      store.schedule = await api.schedule.get({
        group: session.user.group as string,
        date: moment(store.date).format("DD.MM.YYYY"),
      });
    });
  }, []);

  if (store.schedule === null) {
    return (
      <Group separator="hide">
        <Placeholder>
          <Spinner size="large" />
        </Placeholder>
      </Group>
    );
  }

  return (
    <Group>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Week week={store.schedule.week} />
        <RichCell hasActive={false} hasHover={false} subhead="Место">
          {store.schedule.place}
        </RichCell>
      </div>
      <Group
        separator="hide"
        mode="plain"
        header={
          <Header mode="tertiary">
            {store.schedule.lessons.length}{" "}
            {utils.string.declOfNum(store.schedule.lessons.length, [
              "пара",
              "пары",
              "пар",
            ])}
          </Header>
        }
      >
        <List>
          {store.schedule.lessons.map((lesson, index) => (
            <>
              <Lesson lesson={lesson} key={`lesson-${index}`} />
              {index !== store.schedule!.lessons.length - 1 && (
                <Separator key={`separator-${index}`} />
              )}
            </>
          ))}
        </List>
      </Group>
      <Div>
        <SelectDateButtons
          date={store.date}
          onChange={(date) => (store.date = date)}
        />
      </Div>
    </Group>
  );
};

export default observer(Schedule);
