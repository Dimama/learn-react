import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
    
    
    buttons = [
        {name: "all", label: "All"},
        {name: "active", label: "Active"},
        {name: "done", label: "Done"}
    ];
    
    render() {
        
        const buttons = this.buttons.map(({name, label}) => {
            
            const clazz = this.props.filter === name ? "btn-info" : "btn-outline-secondary";
            return <button
                    className={`btn ${clazz}`}
                    key={name}
                    onClick={() => this.props.onFilterClick(name)}>
                    {label}
                   </button>
        });
        
        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
}