import { IScheduleGetResponse } from "@mpt-assistant/api-wrapper/lib/types";
import { makeAutoObservable } from "mobx";

class ScheduleStore {
  public schedule: IScheduleGetResponse | null = null;
  public date: Date = new Date();

  constructor() {
    makeAutoObservable(this);
  }
}

const store = new ScheduleStore();

export default store;