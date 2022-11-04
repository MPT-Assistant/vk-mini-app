import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import utils from "@rus-anonym/web-utils";
import {
  IScheduleGetResponse,
  IWeek,
} from "@mpt-assistant/api-wrapper/lib/types";
import {
  RichCell,
  Group,
  List,
  Separator,
  Footer,
  Placeholder,
  Spinner,
} from "@vkontakte/vkui";
import api from "../../TS/api";
import session from "../../TS/store/session";

const Lesson = ({
  lesson,
}: {
  lesson: IScheduleGetResponse["lessons"][number];
}): JSX.Element => {
  return (
    <RichCell
      hasActive={false}
      hasHover={false}
      multiline
      text={lesson.teacher}
      before={`${lesson.num}.`}
      //   after="08:30:00 - 10:00:00" // TODO: Добавить время
    >
      {lesson.name}
    </RichCell>
  );
};

const Week = ({ week }: { week: IWeek }): JSX.Element => {
  return (
    <RichCell
      hasActive={false}
      hasHover={false}
      text={week.value}
      subhead="Неделя"
    >
      {week.date}
    </RichCell>
  );
};

const Schedule = () => {
  const [schedule, setSchedule] = useState<IScheduleGetResponse | null>(null);

  useEffect(() => {
    (async () => {
      const schedule = await api.schedule.get({
        group: session.user.group,
      });
      setSchedule(schedule);
    })();
  }, []);

  if (schedule === null) {
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
        <Week week={schedule.week} />
        <RichCell hasActive={false} hasHover={false} subhead="Место">
          {schedule.place}
        </RichCell>
      </div>
      <Group separator="hide" mode="plain">
        <List>
          {schedule.lessons.map((lesson, index) => (
            <>
              <Lesson lesson={lesson} />
              {index !== schedule.lessons.length - 1 && <Separator />}
            </>
          ))}
        </List>
      </Group>
      <Footer>
        {schedule.lessons.length}{" "}
        {utils.string.declOfNum(schedule.lessons.length, [
          "пара",
          "пары",
          "пар",
        ])}
      </Footer>
    </Group>
  );
};

export default observer(Schedule);
