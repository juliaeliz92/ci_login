import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {IndexIndexLink, Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import Footer from './Footer';
import logo from '../images/logo.jpg'
import cardImg from '../images/keepCalm.png'
// import backgroundImg from '../images/backgroundImg.jpg'
import gitLogo from '../images/gitLogo.png'
import './App.css'
import { Grid,Col,Row } from 'react-flexbox-grid/lib/index'
import ActionBugReport from 'material-ui/svg-icons/action/bug-report'


import Request from 'superagent';

class login extends React.Component {

constructor(props) {
   super(props);
   this.state={name:''};
   this.loginGithub=this.loginGithub.bind(this);
 }
 loginGithub()
 {
   Request
   .get('http://localhost:9080/api/loginGithub')
   .end(function(err,resp)
   {
         if (err) console.log(err);
         console.log(resp);
     })
 }
   render() {

      return (
      	<div>
        	<div>
            <AppBar

              title="KI-Keep Integrating"
              iconElementLeft={<IconButton><ActionBugReport /></IconButton>}
              iconElementRight=
                    {<IconMenu
                    iconButtonElement={
                    <IconButton touch={true}>
                    <NavigationExpandMoreIcon />
                    </IconButton>
                    }
                    >
                    <MenuItem primaryText="Features" />
                    <MenuItem primaryText="Blogs" />
                    <MenuItem primaryText="Contact Us" />
                    </IconMenu>}
            />
      		</div>


          <div>
          <Grid>
          <Row center="xs">
                  <Card>

                <CardText>
                  A CI platform you have been dreaming for !!
                </CardText>

                <CardMedia
                >
                  <img src={cardImg} />
                </CardMedia>

                <CardActions >

                  <Link to="/auth/github">
                    <FlatButton secondary={true} hoverColor='#D1C4E9' label="Login With Github"/>
                    </Link>
                    

                </CardActions>

              </Card>
          </Row>

          </Grid>

          <Footer />
        	</div>
        </div>
      );
   }
}


export default login;
