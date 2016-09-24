import React, { Component } from 'react';
import NavLink from '../common/NavLink'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton'

const Navigation = () => (
  <div>
      <AppBar title="Time Sheeting" />
      <ul>
          <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/contact">Contact Us</NavLink></li>
      </ul>
  </div>


);
export default Navigation
