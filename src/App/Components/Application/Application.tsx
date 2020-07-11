import React, { FunctionComponent } from "react";
import {
  Typography,
  CardHeader,
  CardContent,
  Card,
  Box,
  Button,
} from "@material-ui/core";
import ActuatorService from "../../../Service/ActuatorService";

export interface ApplicationProps {
  name: string;
  backgroundColor?: string;
  version: string;
  status: "UP" | "DOWN";
  port: string;
  onClickCard: (port: string) => void;
  onShutdownApplication: () => void;
}

const Application: FunctionComponent<ApplicationProps> = (props) => {
  return (
    <Box
      display="inline-table"
      flexDirection="row"
      alignItems="flex-start"
      m={1}
    >
      <Card raised>
        <CardHeader
          title={props.name}
          onClick={() => props.onClickCard(props.port)}
        ></CardHeader>
        <CardContent>
          <Typography>
            Version: <strong>{props.version}</strong>
          </Typography>
          <Typography>
            Listening at: <strong>http://localhost:{props.port}</strong>
          </Typography>
          <Typography>
            Status: <strong>{props.status}</strong>
          </Typography>
          <Typography>
            Rest Documentation:{" "}
            <strong>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"http://localhost:" + props.port + "/swagger-ui.html"}
              >
                Open Swagger
              </a>
            </strong>
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              new ActuatorService(props.port).shutdownApp().then((res) => {
                console.log(res);
                props.onShutdownApplication();
              });
            }}
          >
            Stop Application
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Application;
