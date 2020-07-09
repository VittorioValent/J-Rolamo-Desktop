export default interface AppInfo {
  name: string;

  version: string;

  port: string;

  status: "UP" | "DOWN";
}
