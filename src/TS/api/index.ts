import { API as APIBase } from "@mpt-assistant/api-wrapper";

import APIApp from "./sections/app";

class API extends APIBase {
    public readonly app: APIApp;

    constructor() {
        super();
        this.app = new APIApp(this);
    }
}

export default new API()