import React, { FunctionComponent } from "react";
import { CardHeader, CardContent, Card, Box } from "@material-ui/core";
import EntityInfo from "../../../Model/EntityInfo";
import Fields from "../Fields/Fields";

export interface EntityProps {
  entity: EntityInfo;
}

const Entity: FunctionComponent<EntityProps> = (props) => {
  return (
    <Box
      display="inline-flex"
      flexWrap="wrap"
      flexDirection="row"
      alignItems="flex-start"
      m={2}
    >
      <Card variant="elevation" raised>
        <CardHeader title={props.entity.entityName}></CardHeader>
        <CardContent>
          <Fields fields={props.entity.fields} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Entity;
