import { API, APIError } from "@mpt-assistant/api-wrapper";
import { IAPIError } from "@mpt-assistant/api-wrapper/lib/types";
import axios from "axios";
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

interface IUserInfo {
  type: "user";
  id: number;
  name: string;
  surname: string;
  photo: string;
}

class APIApp {
  private readonly _api: API;

  constructor(api: API) {
    this._api = api;
  }

  private async _call<Res>(method: string, data?: object): Promise<Res> {
    type TResponse =
      | { response: Res; error: never }
      | { response: never; error: IAPIError };

    const response = await axios<TResponse>({
      method: "POST",
      url: `${this._api["_apiUrl"]}/${method}`,
      headers: {
        "User-Agent": "@mpt-assistant/api-wrapper",
      },
      data: {
        sign: session.sign,
        ...data
      },
    });

    if (response.data.error) {
      throw new APIError(response.data.error);
    } else {
      return response.data.response;
    }
  }

  public async getUser(): Promise<IUser> {
    return this._call("app.getUser", {
      sign: session.sign,
    });
  }

  public async getUsersInfo(user_ids: number[]): Promise<IUserInfo[]> {
    return this._call("app.getUsersInfo", {
      sign: session.sign,
      user_ids
    });
  }
}

export type { IUser, IUserInfo };

export default APIApp;
