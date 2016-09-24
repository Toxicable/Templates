/**
 * Created by Fabian on 21/09/2016.
 */
import React,  { PropTypes }from 'react';

const Task = ({task, handleClick}) => (

    <div className="task-card__item">
        Description: {task.description}<br />
        Client: {task.client}<br />
        Time Spent: {task.timeSpent} <br />
        <button onClick={ () => handleClick(task.id, 2)}>+1</button>
    </div>


);

Task.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        product: PropTypes.string.isRequired,
        client: PropTypes.string.isRequired,
        timeSpent: PropTypes.number.isRequired

    })
}

export default Task