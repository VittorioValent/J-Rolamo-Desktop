import React, { Component, Fragment } from "react";
import WorkshopService from "../../../Service/WorkshopService";
import EntityInfo from "../../../Model/EntityInfo";
import Entity from "../../Components/Entity/Entity";
import { Button, Typography, Box, CircularProgress } from "@material-ui/core";
import { NewEntity } from "../../../Routes/RouteDefinition";
import { connect } from "react-redux";
import { RootState } from "../../../Redux/Reducers";

class Entities extends Component<any, any> {
  state = {
    entities: [],
  };

  render() {
    const entities =
      this.state.entities.length === 0 ? (
        <CircularProgress
          size={100}
          style={{ marginLeft: "45%" }}
          color="secondary"
        />
      ) : (
        this.state.entities.map((entity: EntityInfo) => {
          return <Entity key={entity.entityName} entity={entity} />;
        })
      );
    return (
      <Fragment>
        <Typography align="center" variant="h3">
          Entities
        </Typography>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            this.props.history.push(NewEntity.path);
          }}
        >
          New Entity
        </Button>
        <Box>{entities}</Box>
      </Fragment>
    );
  }

  componentDidMount() {
    this.getAllEntities();
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getAllEntities = () => {
    new WorkshopService(this.props.currentPort)
      .getAllEntities()
      .then((res: any) => {
        this.setState({
          entities: res.data,
        });
        this.sleep(10000).then(() => this.getAllEntities());
      })
      .catch((err) => {
        this.sleep(2000).then(() => this.getAllEntities());
      });
  };
}
const mapState = (state: RootState) => ({
  currentPort: state.applications.currentPort,
});

export default connect(mapState, null)(Entities);
