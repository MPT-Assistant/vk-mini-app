import { API } from "@mpt-assistant/api-wrapper";
import session from "../../store/session";

interface IUser {
    id: number;
    group: string;
    nickname: string;
    mailings: {
        replacements: boolean;
    };
    regDate: Date;
}

class APIApp {
  private readonly _api: API;
  private readonly _call: API["call"];

  constructor(api: API) {
    this._api = api;
    this._call = this._api.call.bind(api);
  }

  public async getUser(): Promise<IUser> {
    return this._call("app.getUser", {
        sign: session.sign
    });
  }
}

export type { IUser }

export default APIApp;