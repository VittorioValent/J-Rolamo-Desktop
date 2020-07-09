import FieldInfo from "./FieldInfo";
import { ControllerType } from "./ControllerType";
import { ServiceType } from "./ServiceType";

export default interface EntityInfo {
  entityName: string;

  auditable: boolean;

  fields: FieldInfo[];

  controllerType: ControllerType | null;

  serviceType: ServiceType | null;
}
