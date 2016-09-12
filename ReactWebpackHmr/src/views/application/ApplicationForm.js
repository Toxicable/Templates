import React, { Component } from 'react';
import  FormInput  from './FormInput';

export default class ApplicationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputs: ['inputs-0']
        
        }
    }
    render() {
        return (
            <div>
                <h1>Who are you?</h1>
            <small>Tell us about yourself</small>
                <textarea />

                <h1>How long have you played WoW for?</h1>
                <select>
                    <option value="0">Less than 1 year</option>
                    <option value="2">2 years</option>
                
                    <option value="3">3 years</option>
                    <option value="4">More then 3 years</option>
                </select>
                <FormInput label="Description" />

                <h2>Experiance</h2>
                <button onClick={ () => this.appendInput() }>
                   + Add another achievement
               </button>
                <div>
                {
                    this.state.inputs.map(input => <FormInput key={input} />
        
                )}
                </div>
                <h1>What brings you to our Guild</h1>
                <textarea />

                <h1>Please provide an armoury link and any avilble logs</h1>
                
                <button onClick={ () => this.appendInput() }>
                   + Add another achievement
               </button>
                <div>
                {
                    this.state.inputs.map(input => <FormInput key={input} label={input} />
        
                )}
                </div>

                <h1>Double Check raid times - can you make all of them?</h1>
                <input />

          </div>
      );
}

appendInput() {
    var newInput = `input-${this.state.inputs.length}`;
    this.setState({ inputs: this.state.inputs.concat([newInput]) });
}

}
