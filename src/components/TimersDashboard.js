import React, {Component} from 'react';
import timers from '../fixtures/timers';
import helpers from '../helpers/helpers';
import EditableTimerList from './EditableTimerList';
import ToggleableTimerForm from './ToggleableTimerForm';

class TimersDashboard extends Component {
    state = {
        timers: timers
    };
    
    handleStartClick = timerId => {
        this.onStartTimer(timerId);
    };

    onStartTimer = timerId => {
        const timeNow = Date.now();
        
        this.setState({
            timers: this.state.timers.map(timer => {
                if (timer.id === timerId) {
                    return Object.assign({}, timer, {
                        runningSince: timeNow
                    });
                } else {
                    return timer;
                }
            })
        });
    };
    
    handleStopClick = timerId => {
        this.onStopTimer(timerId);
    };

    onStopTimer = timerId => {
        const timeNow = Date.now();
        
        this.setState({
            timers: this.state.timers.map(timer => {
                if (timer.id === timerId) {
                    const lastElapsed = timeNow - timer.runningSince;
                    return Object.assign({}, timer, {
                        elapsed: timer.elapsed + lastElapsed,
                        runningSince: null,
                    });
                } else {
                    return timer;
                }
            })
        });
    };

    handleEditFormSubmit = attr => {
        this.updateTimer(attr);
    };

    updateTimer = attr => {
        this.setState({
            timers: this.state.timers.map(timer => {
                if (timer.id === attr.id) {
                    return Object.assign({}, timer, {
                        title: attr.title,
                        project: attr.project
                    });
                } else {
                    return timer;
                }
            })
        });
    };
    
    handleDeleteTimer = timerId => {
        this.deleteTimer(timerId);
    };
    
    deleteTimer = timerId => {
        this.setState({
            timers: this.state.timers.filter(timer => {
                return timer.id !== timerId.id;
            })
        });
    };
    
    handleCreateTimer = timer => {
      this.createTimer(timer);  
    };
    
    createTimer = timer => {
        const t = helpers.newTimer(timer);
        
        this.setState({
            timers: this.state.timers.concat(t)
        });
    }; 
    
    render() {
        return (
            <div className='ui three column centered grid'> 
                <div className='column'>
                    <EditableTimerList 
                        timers={this.state.timers}
                        onFormSubmit={this.handleEditFormSubmit}
                        onDeleteTimer={this.handleDeleteTimer}
                        onStartClick={this.handleStartClick}
                        onStopClick={this.handleStopClick}
                    />
                    <ToggleableTimerForm onFormSubmit={this.handleCreateTimer}/>
                </div>
            </div>
        );
    }
}

export default TimersDashboard;