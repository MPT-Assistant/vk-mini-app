import { GetLaunchParamsResponse } from "@vkontakte/vk-bridge";
import { IUser } from "../api/sections/app";

class Session {
  public launchParams!: GetLaunchParamsResponse;
  public user!: IUser;

  public get sign(): string {
    return new URLSearchParams(
      this.launchParams as unknown as Record<string, string>
    ).toString();
  }
}

export default new Session();
