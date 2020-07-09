import React, { ChangeEvent, FunctionComponent } from "react";
import {
  FormGroup,
  TextField,
  Box,
  Switch,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
  FormControl,
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Divider,
} from "@material-ui/core";
import FieldInfo from "../../../../Model/FieldInfo";
import { ControllerType } from "../../../../Model/ControllerType";
import { ServiceType } from "../../../../Model/ServiceType";
import EntityInfo from "../../../../Model/EntityInfo";
import WorkshopService from "../../../../Service/WorkshopService";
import { connect } from "react-redux";
import { RootState } from "../../../../Redux/Reducers";
import { Entities } from "../../../../Routes/RouteDefinition";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);
const NewEntity: FunctionComponent = (props: any) => {
  const classes = useStyles();
  const [entityName, setEntityName] = React.useState("");
  const [auditable, setAuditable] = React.useState(false);
  const [controllerType, setControllerType] = React.useState(
    ControllerType.CRUD
  );
  const [serviceType, setServiceType] = React.useState(ServiceType.PUBLIC);
  const [fields, setFields] = React.useState(new Array<FieldInfo>());

  const onChangeEntityName = (event: ChangeEvent<HTMLInputElement>) => {
    setEntityName(event.target.value);
  };

  const onToggleAuditable = (event: ChangeEvent<HTMLInputElement>) => {
    setAuditable(event.target.checked);
  };

  const onAddField = () => {
    setFields([...fields].concat([{ type: "", name: "" }]));
  };

  const onSelectType = (event: any, index: number) => {
    const newFields = [...fields];
    newFields[index].type = event.target.value as string;
    setFields(newFields);
  };
  const onChangeFieldName = (event: any, index: number) => {
    const newFields = [...fields];
    newFields[index].name = event.target.value as string;
    setFields(newFields);
  };

  const onCreateEntity = () => {
    const newEntity: EntityInfo = {
      entityName: entityName,
      auditable: auditable,
      fields: fields,
      controllerType: controllerType,
      serviceType: serviceType,
    };
    new WorkshopService(props.currentPort)
      .createNewEntity(newEntity)
      .then((res) => {
        console.log("Successo");
      })
      .catch((err) => {
        console.log(err);
      });
    props.history.push(Entities.path);
  };

  const fieldInputs = fields.map((field, index) => {
    return (
      <FormGroup key={index} style={{ width: "100%" }}>
        <Select
          id="type-select"
          color="secondary"
          style={{ margin: "4px" }}
          label="Type"
          value={field.type}
          onChange={(event) => onSelectType(event, index)}
        >
          <MenuItem value="">Select a Type</MenuItem>
          <MenuItem value="java.lang.String">String</MenuItem>
          <MenuItem value="java.lang.Boolean">Boolean</MenuItem>
          <MenuItem value="java.lang.Integer">Integer</MenuItem>
          <MenuItem value="java.lang.Long">Long</MenuItem>
          <MenuItem value="java.lang.Float">Float</MenuItem>
          <MenuItem value="java.lang.Double">Double</MenuItem>
        </Select>
        <TextField
          color="secondary"
          style={{ margin: "4px" }}
          label="Name"
          value={field.name}
          onChange={(event) => onChangeFieldName(event, index)}
        />
      </FormGroup>
    );
  });

  const form = (
    <Grid container spacing={3}>
      <Grid item md={4}>
        <FormControlLabel
          label="General Info"
          labelPlacement="top"
          control={
            <FormControl id="generalInfo" className={classes.formControl}>
              <FormGroup>
                <TextField
                  color="secondary"
                  label="Entity Name"
                  value={entityName}
                  onChange={onChangeEntityName}
                />
                <FormControlLabel
                  label="Auditable"
                  labelPlacement="start"
                  control={
                    <Switch value={auditable} onChange={onToggleAuditable} />
                  }
                />
                <Divider style={{ margin: "10px" }} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onCreateEntity}
                >
                  Create Entity
                </Button>
              </FormGroup>
            </FormControl>
          }
        />
      </Grid>
      <Grid item md={4}>
        <FormControlLabel
          label="Controller and Service"
          labelPlacement="top"
          control={
            <FormControl className={classes.formControl}>
              <FormGroup style={{ width: "100%" }}>
                <FormControlLabel
                  label="Controller:"
                  labelPlacement="start"
                  control={
                    <Select
                      id="controllerType-select"
                      color="secondary"
                      style={{ margin: "10px", width: "100%" }}
                      label="Contoller Type"
                      value={controllerType}
                      onChange={(event) =>
                        setControllerType(event.target.value as ControllerType)
                      }
                    >
                      <MenuItem value={ControllerType.CRUD}>Crud</MenuItem>
                      <MenuItem value={ControllerType.READ}>Read</MenuItem>
                    </Select>
                  }
                />
                <FormControlLabel
                  label="Service:"
                  labelPlacement="start"
                  control={
                    <Select
                      id="serviceType-select"
                      color="secondary"
                      style={{ margin: "10px", width: "100%" }}
                      label="Service Type"
                      value={serviceType}
                      onChange={(event) =>
                        setServiceType(event.target.value as ServiceType)
                      }
                    >
                      <MenuItem value={ServiceType.PUBLIC}>Public</MenuItem>
                      <MenuItem value={ServiceType.PROTECTED}>
                        Protected
                      </MenuItem>
                      <MenuItem value={ServiceType.PRIVATE}>Private</MenuItem>
                    </Select>
                  }
                />
              </FormGroup>
            </FormControl>
          }
        />
      </Grid>
      <Grid item md={4}>
        <FormControlLabel
          label="Fields"
          labelPlacement="top"
          control={
            <FormControl className={classes.formControl}>
              <FormGroup>
                {fieldInputs}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={onAddField}
                >
                  Add Field
                </Button>
              </FormGroup>
            </FormControl>
          }
        />
      </Grid>
    </Grid>
  );

  return (
    <Box display="inline-flex" alignItems="center">
      {form}
    </Box>
  );
};

const mapState = (state: RootState) => ({
  currentPort: state.applications.currentPort,
});

export default connect(mapState, null)(NewEntity);
