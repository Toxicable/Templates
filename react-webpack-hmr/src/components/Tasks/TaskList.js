/**
 * Created by Fabian on 21/09/2016.
 */
import React, { Component } from 'react';
import Task  from './Task';

class TaskList extends Component {

    constructor(props){
        super(props)
        this.state = { tasks: [
            {
                id: 0,
                description: "Fabians task",
                timeSpent: 1.5,
                client: "FabianCorp",
                product: "fabianswebsite"
            },
            {
                id: 1,
                description: "Readying stuff",
                timeSpent: 2,
                client: "FabianCorp",
                product: "fabianswebsite"
            },
            {
                id: 2,
                description: "Readying stuff",
                timeSpent: 2,
                client: "FabianCorp",
                product: "fabianswebsite"
            }
        ]};
    }

    incrimentTime = (id, newValue) =>
    {
        let index = this.state.tasks.findIndex(task => task.id == id);

        let tasks = [
            ...this.state.tasks.slice(0, index),
            Object.assign({},this.state.tasks[index], {timeSpent: this.state.tasks[index].timeSpent + newValue}),
            ...this.state.tasks.slice(index + 1)
        ]
        this.setState({tasks});
    };

render(){
    return (
        <div>
            <h1>Tasks</h1>

            <div className="task-card-container">
                {this.state.tasks.map( task =>
                        <Task
                            key={task.id}
                            task={task}
                            handleClick={this.incrimentTime}
                        />
                    )}

            </div>
        </div>
    )
}

};

export default TaskList