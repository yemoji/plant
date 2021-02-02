import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  Button,
  makeStyles,
  Slider,
  useTheme,
  withStyles,
} from "@material-ui/core";
// import { Slider, RangeSlider } from 'rsuite';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import GroupIcon from '@material-ui/icons/Group';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import clsx from 'clsx';


// const useStyles = makeStyles({
//   root: {
//     height: 300,
//   },
// });

function valuetext(value) {
  return `${value}°C`;
}

const marks = [
  {
    value: 0,
    label: "0°C",
  },
  {
    value: 20,
    label: "20°C",
  },
  {
    value: 37,
    label: "37°C",
  },
  {
    value: 100,
    label: "100°C",
  },
];

const SubContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  max-width: 500px;
`;

const SubContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  max-width: 500px;
`;

const PrettoSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: '-10px !important',
    marginBottom: -10,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const SmartPlantPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState(30);
  const [list, setList] = useState([
    {
      dama: 0,
      noor: 0,
      rotobat: 0,
    },
  ]);
  const [input, setInput] = useState("");
  const [watter, setWatter] = useState(0);
  const [temperture, setTemperture] = useState(0);
  const [lux, setLux] = useState(0);
  const [id, setId] = useState(1);

  const [PostWatter, setPostWatter] = useState(0);
  const [PostTemperture, setPostTemperture] = useState(0);
  const [PostLux, setPostLux] = useState(0);

  // get data from server and give a response promise
  const getData = async (id) => {
    return await axios({
      method: "get",
      url: `http://192.168.1.144/get`,
    });
  };

  const postData = async (inputWater, inputLux, inputTemp) => {
    return await axios({
      method: "post",
      url: `http://192.168.1.144/postform/`,
      data: { temp: inputTemp, moisture: inputWater, lux: inputLux },
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setId(id + 1);
      if (id === 50) setId(1);
      //calling server:
      getData(id).then((res) => {
        //res = server response
        console.log(res);
        setTemperture(res.data.temp);
        setWatter(res.data.moisture);
        setLux(res.data.lux);
        setList([
          ...list,
          {
            dama: temperture,
            noor: lux,
            rotobat: watter,
          },
        ]);
      });

      if (list.length === 10) {
        const _list = list.slice(1, 10);
        setList([..._list]);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [list, input]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChanged = (event) => {
    setInput(event);
  };

  function handleButtonClicked() {
    setCount([...list, input]);
    postData(data1, data2, data3).then(res => {console.log("postres", res)})
  }
  console.log("as");
  return (
    <Container>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {/* Persistent drawer */}
            Smart Plant
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={'Participating members'} />
            </ListItem>
        </List>
        <Divider />
        <List>
          {["Fatemeh Joyande", "Ali Sobhani", "Mino Heidary"].map((text) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <List2>
        {list.map((data, index) => (
          <p key={index}>
            dama is, {data.dama} noor is {data.noor} and rotobat is
            {data.rotobat}
          </p>
        ))}
      </List2>
      <SubContainer>
        <P>Temperature</P>
        <PrettoSlider
          style={{ height: "300px" }}
          orientation="vertical"
          value={PostTemperture}
          valueLabelDisplay="auto"
          // getAriaValueText={PostTemperture}
          onChange={(e, v) => {
            console.log(v);
            setPostTemperture(v);
          }}
          // defaultValue={30}
        />
      </SubContainer>
      <SubContainer2>
        <P>Lux</P>
        <Slider
          type="range"
          value={PostLux}
          valueLabelDisplay="auto"
          onChange={(e, v) => {
            setPostLux(v);
          }}
        />
      </SubContainer2>
      <SubContainer2>
        <P>Water</P>
        <Slider
          type="range"
          min={0}
          max={10}
          valueLabelDisplay="auto"
          value={PostWatter}
          onChange={(e, v) => {
            setPostWatter(v);
          }}
        />
      </SubContainer2>
      <Button
        style={{
          backgroundColor: "#90caf9",
          padding: "15px 35px",
          color: "#fff",
        }}
        onClick={() => {
          // handleButtonClicked();

          // console.log("watter", PostWatter);
          // console.log("lux", PostLux);
          // console.log("temperture", PostTemperture);
          postData(PostWatter, PostLux, PostTemperture);
        }}
      >
        Primary
      </Button>
      {/* <input
        type="text"
        onChange={(event) => handleInputChanged(event.target.value)}
      /> */}
    </Container>
  );
};

export default SmartPlantPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  padding: 50px;
`;

// const Slider = styled("input")`
//   width: 70%;
// `;

const List2 = styled("div")`
  padding-top: 50px;
  width: 500px;
  /* overflow: scroll; */
  /* overflow-x: hidden; */
  display: flex;
  flex-direction: column-reverse;
  /* justify-content: center; */
  align-items: center;
  margin-top: 50px;
`;

export const P = styled.p`
  background-color: #3f51b5;
  color: #fff;;
  border-radius: 4px;
  padding: 25px 45px;
`
