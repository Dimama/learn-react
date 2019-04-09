import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';


export default class App extends Component {
    
    maxId = 0;
    
    createItem = (text) => {
        return {label: text,
                important: false,
                done: false,
                id: this.maxId++}
    };
    
    state = {
        todoData: [this.createItem("Eat"),
                   this.createItem("Sleep"),
                   this.createItem("Programming")],
        term: "",
        filter: "all"
    };
    

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: todoData.filter((el) => el.id !== id)
            }
        })
    };
    
    addItem = (text) => {
        this.setState( ({ todoData }) => {
            return {
                todoData: [...todoData, this.createItem(text)]
            };
        })
    };
    
    toggleProperty(arr, id, propName) {
    
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
    
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
        
    }
    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, "important")
            };
        });
    };
    
    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, "done")
            };
        });
    };
    
    searchPanelChange = (text) => {
        this.setState({
            term: text
        });
    };
    
    onFilterClick = (filter) => {
        this.setState({filter});
    };
    
    search = (array, term) => {
        if (term.length === 0) {
            return array;
        }
        
        return  array.filter((item) => item.label.toLowerCase().indexOf(term.toLowerCase()) > -1);
    };
    
    search_filter = (array, filterType) => {
        if (filterType === "active") {
            return array.filter((item) => item.done === false)
        } else if (filterType === "done"){
            return array.filter((item) => item.done === true)
        }
        
        return array
    };
    
    render() {
        
        const { todoData, term, filter} = this.state;
        
        const visibleItems = this.search_filter(this.search(todoData, term), filter);
        
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        
        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChangeValue={this.searchPanelChange}/>
                    <ItemStatusFilter filter={filter} onFilterClick={this.onFilterClick}/>
                </div>
            
                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                    
                <ItemAddForm
                    onAddItem={this.addItem}
                />
                
            </div>
        );
    }
}
