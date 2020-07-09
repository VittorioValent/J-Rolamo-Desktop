import React, { FunctionComponent } from "react";
import { List } from "@material-ui/core";
import FieldInfo from "../../../Model/FieldInfo";
import Field from "./Field";

export interface FieldsProps {
  fields: FieldInfo[];
}

const Fields: FunctionComponent<FieldsProps> = (props) => {
  const fields = props.fields.map((field) => {
    return <Field key={field.name + field.type} field={field} />;
  });
  return <List>{fields}</List>;
};

export default Fields;
