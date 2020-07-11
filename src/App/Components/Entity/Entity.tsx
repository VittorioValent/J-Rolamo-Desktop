import React, { FunctionComponent } from "react";
import {
  CardHeader,
  CardContent,
  Card,
  Box,
  Collapse,
} from "@material-ui/core";
import EntityInfo from "../../../Model/EntityInfo";
import Fields from "../Fields/Fields";

export interface EntityProps {
  entity: EntityInfo;
}

const Entity: FunctionComponent<EntityProps> = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      display="inline-table"
      //   flexWrap="wrap"
      flexDirection="row"
      alignItems="flex-start"
      m={1}
    >
      <Card variant="elevation" raised style={{ width: "40vw" }}>
        <CardHeader
          title={props.entity.entityName}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Fields fields={props.entity.fields} />
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export default Entity;


