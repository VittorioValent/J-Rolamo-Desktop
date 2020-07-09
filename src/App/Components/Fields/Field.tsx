import React, { FunctionComponent } from "react";
import { Typography, ListItem } from "@material-ui/core";
import FieldInfo from "../../../Model/FieldInfo";

export interface FieldProps {
  field: FieldInfo;
}

const Field: FunctionComponent<FieldProps> = (props) => {
  return (
    <ListItem>
      <Typography>
        {props.field.type} - {props.field.name}
      </Typography>
    </ListItem>
  );
};

export default Field;
