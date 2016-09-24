/**
 * Created by Fabian on 17/09/2016.
 */
import React, { Component } from 'react';
import { Link } from 'react-router'

class NavLink extends Component {
    render() {
        return <Link {...this.props} activeClassName="active"/>
    }

}

export default NavLink