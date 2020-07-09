import axios, { AxiosInstance } from "axios";
import EntityInfo from "../Model/EntityInfo";

export default class WorkshopService {
  private axios: AxiosInstance;

  constructor(port: string, host: string = "localhost") {
    this.axios = axios.create({
      baseURL: "http://" + host + ":" + port + "/workshop/",
    });
  }

  public getAllEntities(): Promise<EntityInfo[]> {
    return this.axios.get("entities");
  }

  public createNewEntity(entityInfo: EntityInfo): Promise<any> {
    return this.axios.post("entityflow", entityInfo);
  }
}
