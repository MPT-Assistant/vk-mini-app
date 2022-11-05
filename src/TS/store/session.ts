import { GetLaunchParamsResponse } from "@vkontakte/vk-bridge";
import api from "../api";
import { IUser, IUserInfo } from "../api/sections/app";

class Session {
  public launchParams!: GetLaunchParamsResponse;
  public user!: IUser & IUserInfo;

  public get sign(): string {
    return new URLSearchParams(
      this.launchParams as unknown as Record<string, string>
    ).toString();
  }

  public async loadUser(): Promise<void> {
      const user = await api.app.getUser();
      const [userInfo] = await api.app.getUsersInfo([user.id]);
      this.user = { ...user, ...userInfo };
  }
}

export default new Session();
