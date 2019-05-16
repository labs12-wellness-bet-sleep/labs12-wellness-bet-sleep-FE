import React from 'react';
import {
  withStyles,
  Menu,
  MenuItem,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Button, Card, CardActionArea, CardMedia
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { Route } from 'react-router-dom';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';

import JoinWithCode from './JoinWithCode';
import CreateForm from './CreateForm';




const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    margin: '0 auto',
    marginLeft:'400px'
  },
  appBar: {
    marginLeft: drawerWidth,
    backgroundColor: '#E5F3F9',
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  listitem: {
    borderBottom: "solid",
    borderColor: "#6ABBDF",
    borderBottomWidth: "thin",
    color: "#008BC9",
    padding: "16px",
    marginTop: "1px"
  },
  text: {
    color: "#008BC9",
    fontWeight: '500'
  },
  fitgirl: {
    marginLeft: '450px',
    marginTop: '440px'
  },
  welcome: {
    width: '200px',
    textAlign: 'center',
    flexWrap: 'wrap',
    fontSize: '24px',
    margin: '0 auto',
    marginTop: '-100px',
    marginBottom: '50px',
    fontWeight: 'bold',
    color: '#249BD1',
  },
  createMess: {
    width: '215px',
    margin: '0 auto',
    lineHeight: '2',
    textAlign: 'center',
    marginTop: '-40px',
    fontSize: '16px',
    color: '#249BD1',
    marginBottom: '15px'
  },

  card: {
    maxWidth: "100%",
    height: 440,
    margin: '0 auto',
    boxShadow: 'none'
  }

});


const addicon = {

  fontSize: "18px",
  flexGrow: 1
}

const button = {
  color: "#008BC9",
  width: "20px",
  height: "20px",
  border: "solid",
  borderWidth: "thin",
  borderColor: "#008BC9",
  left: "75px",
  marginBottom: "5px"

}

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));


function GroupsNav(props) {
  const { classes } = props;
  console.log(props.groups)




  return (
    <WithState>
      {({ anchorEl, updateAnchorEl }) => {
        const open = Boolean(anchorEl);
        const routeHandler = () => {
          props.history.push('/dashboard/nav/create')
          updateAnchorEl(null)
        }
        const handleClose = () => {
          updateAnchorEl(null)
        }
        const routeHandlerJoin = () => {
          props.history.push('/dashboard/nav/join')
          updateAnchorEl(null)
        }
        return (
          <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
                <Typography variant="h6" style={{ color: '#229BD0' }} noWrap>

                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
              anchor="left"
            >
              <ListItem button style={{ backgroundColor: '#CEE8F3' }}>
                <ListItemText style={{ display: 'flex', color: '#229BD0', marginTop: '65px' }}>
                  <Typography variant="h6" style={{ display: 'inline', fontWeight: 'bold', color: '#229BD0', textAlign: 'center', alignContent: 'flex-end' }} noWrap>
                    My Groups
                </Typography>
                  <Button
                    aria-owns={open ? 'render-props-menu' : undefined}
                    aria-haspopup="true"
                    onClick={event => {
                      updateAnchorEl(event.currentTarget);
                    }}
                    variant="fab"
                    style={button}
                    mini>
                    <AddIcon style={addicon} />
                  </Button>
                  <Menu style={{ borderRadius: '10px', marginLeft: 15, marginTop: 35 }} id="render-props-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem style={{ color: '#70BEE1', fontWeight: 'bold', borderBottom: 'solid', borderWidth: 'thin', borderColor: '#70BEE1' }} onClick={routeHandler}>Create Group</MenuItem>
                    <MenuItem style={{ color: '#70BEE1', fontWeight: 'bold' }} onClick={routeHandlerJoin}>Join Group</MenuItem>
                  </Menu>
                </ListItemText>
              </ListItem>
              <div className={classes.toolbar} />
              {props.groups.map((group) =>
                <ListItem key={group.id} className={classes.listitem} button >
                  <ListItemText key={group.id} classes={{ primary: props.classes.text }} primary={group.groupName} />

                </ListItem>
              )}

            </Drawer>
             {props.groups.length < 0 ?
              <div className={classes.fitgirl}>
                <Typography className={classes.welcome}>
                  Welcome To Wellness Tracker
            </Typography>
                <Typography className={classes.createMess}>
                  Create a new group or join an existing one with a join code
            </Typography>
                <Card className={classes.card}>
                  <CardMedia
                    style={{ paddingTop: '56.25%', width: '600px', height: 440 }}
                    image={require('../../assets/images/fitgirl.png')}
                    title="Contemplative Reptile"
                  />
                </Card>
              </div> : null
             }
            <Route path="/dashboard/nav/join" component={JoinWithCode}/>
            <Route path="/dashboard/nav/create" component={CreateForm} />
          </div>
          
        )
      }}
    </WithState>
  )
}



export default withStyles(styles)(GroupsNav);