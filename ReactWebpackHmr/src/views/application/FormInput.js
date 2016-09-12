import React, { Component } from 'react';

export default class FormInput extends Component {
    render() {
        return (
            <div>
            
                <label>{this.props.label}</label>
                <input name="{this.props.name}" />
            </div>
      );
    }
    //static propTypes = {
    //    label: React.PropTypes.string.isRequired,
    //    name: React.PropTypes.string.isRequired,

    //}

}
