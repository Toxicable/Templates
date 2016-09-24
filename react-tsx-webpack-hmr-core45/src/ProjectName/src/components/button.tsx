import * as React from 'react'

declare var mountNode: any;

interface HelloWorldProps extends React.Props<any> {
    Text: string;
    Action: void;
}

export default class Button extends React.Component<HelloWorldProps, {}>{

    render() {

        return <div>
            <button onClick={this.props.Action} > { this.props.Text }</button>
        </div>

    }

}