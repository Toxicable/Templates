/**
 * Created by Fabian on 17/09/2016.
 */
import React, {Component} from 'react';
import  Navigation  from './layout/Navigation';

require('./styles.scss');

class App extends Component {

    render() {
        return (
            <div className="page-title">
                <Navigation />


                {this.props.children}

            </div>
        );
    }

}
export default App