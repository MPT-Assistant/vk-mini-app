import React, { useMemo, useState } from "react";
import moment from "moment";
import { ButtonGroup, Button } from "@vkontakte/vkui";

const _dayTemplates = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"] as const;

const getNextSelectDay = (day: typeof _dayTemplates[number]): Date => {
  const selectedDay = _dayTemplates.findIndex((x) => x === day) + 1;
  const currentDate = new Date();
  const targetDay = Number(selectedDay);
  const targetDate = new Date();
  const delta = targetDay - currentDate.getDay();
  if (delta >= 0) {
    targetDate.setDate(currentDate.getDate() + delta);
  } else {
    targetDate.setDate(currentDate.getDate() + 7 + delta);
  }
  return targetDate;
};

const SelectDateButtons = ({
  date,
  onChange,
}: {
  date: Date;
  onChange: (date: Date) => unknown;
}) => {
  const [selectedDate, setSelectedDate] = useState(date);

  const [prevDate, nextDate] = useMemo(() => {
    return [
      moment(selectedDate).subtract(1, "day").toDate(),
      moment(selectedDate).add(1, "day").toDate(),
    ];
  }, [selectedDate]);

  const isDateToday = useMemo(() => {
    return moment(selectedDate).isSame(new Date(), "day");
  }, [selectedDate]);

  const DayButton = ({ day }: { day: typeof _dayTemplates[number] }) => {
    return (
      <Button
        mode="secondary"
        size="m"
        stretched
        onClick={() => {
          const nextDate = getNextSelectDay(day);
          setSelectedDate(nextDate);
          onChange(nextDate);
        }}
      >
        {day}
      </Button>
    );
  };

  return (
    <ButtonGroup mode="vertical" stretched>
      <ButtonGroup mode="horizontal" gap="m" stretched>
        {_dayTemplates.slice(0, 3).map((day, index) => {
          return <DayButton day={day} key={index} />;
        })}
      </ButtonGroup>
      <ButtonGroup mode="horizontal" gap="m" stretched>
        {_dayTemplates.slice(3).map((day, index) => {
          return <DayButton day={day} key={index} />;
        })}
      </ButtonGroup>
      <ButtonGroup mode="horizontal" gap="m" stretched>
        <Button
          size="m"
          appearance="negative"
          stretched
          onClick={() => {
            setSelectedDate(prevDate);
            onChange(prevDate);
          }}
        >
          {moment(prevDate).format("DD.MM.YYYY")}
        </Button>
        <Button
          size="m"
          appearance="positive"
          stretched
          onClick={() => {
            setSelectedDate(nextDate);
            onChange(nextDate);
          }}
        >
          {moment(nextDate).format("DD.MM.YYYY")}
        </Button>
      </ButtonGroup>
      {!isDateToday && (
        <Button
          appearance="overlay"
          size="m"
          stretched
          onClick={() => {
            const today = new Date();
            setSelectedDate(today);
            onChange(today);
          }}
        >
          Сегодня
        </Button>
      )}
    </ButtonGroup>
  );
};

export default SelectDateButtons;
