import React, { FunctionComponent, MouseEvent, ChangeEvent } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Icon,
  Switch,
  FormGroup,
  FormControlLabel,
  Grid,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";

export interface TopbarProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onChangeTheme: (event: ChangeEvent<HTMLInputElement>) => void;
  darkTheme: boolean;
}

const Topbar: FunctionComponent<TopbarProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={5}>
            <IconButton color="inherit" onClick={props.onClick}>
              <Icon>menu</Icon>
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">J-Rolamo</Typography>
          </Grid>
          <Grid item xs={1}>
            <Button
              color="inherit"
              aria-controls="dropdown-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Icon>settings</Icon>
            </Button>
            <Menu
              id="dropdown-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={props.darkTheme}
                        onChange={props.onChangeTheme}
                      />
                    }
                    label="Toggle Dark Theme"
                  />
                </FormGroup>
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
