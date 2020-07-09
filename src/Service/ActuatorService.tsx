import axios, { AxiosInstance } from "axios";
import AppInfo from "../Model/AppInfo";

export default class ActuatorService {
  private axios: AxiosInstance;

  constructor(port: string, host: string = "localhost") {
    this.axios = axios.create({
      baseURL: "http://" + host + ":" + port + "/actuator/",
    });
  }

  public getHealthStatus(): Promise<String> {
    return this.axios.get("health");
  }

  public getAppInfo(): Promise<AppInfo> {
    return this.axios.get("info");
  }

  public shutdownApp(): Promise<any> {
    return this.axios.post("shutdown");
  }
}
