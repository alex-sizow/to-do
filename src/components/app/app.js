import React, { Component } from 'react';
// Component для инициализации класса
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ToDoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter'
import NewItem from '../new-item';

import './app.css';

export default class App extends Component {

    maxId = 100;
    
    state = {
        todoData: [
            this.createTodoItem('Криндж'),
            this.createTodoItem('Сделай хоть что-нибудь'),
            this.createTodoItem('Наверстать слепой ввод')
        ],
        term: '',
        filter: 'label'
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id:  this.maxId++
        }
    }

    deleteItem = (id) => {
        
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            console.log(idx)
            // не трогай старый state(состояние) ну крч вот этот массив иначальный
            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);

            const newArray = [...before, ...after];

            return {
                todoData: newArray
            };
        });
    };

    addItem = (text) => {
        
        const newItem = this.createTodoItem(text)

        this.setState(({todoData}) => {
            const newArray = [
                ...todoData,
                newItem
            ];
            return {
                todoData : newArray
            };
        })
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [...arr.slice(0, idx), newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {   
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {   
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    }

    onSearchChange = (term) => {
        this.setState({ term });

    };

    filterProperty(arr, filterName = 'label') {
        if (filterName === 'label') {
            return arr
        }

        return arr.filter((item) => {
            return item[filterName];
        })
    }

    onFilterAll = () => {
        this.setState(({filter}) => {
            return {
                filter: 'label'
            }
        })
    }

    onFilterActive = () => {
        this.setState(({filter}) => {
            return {
                filter: 'important'
            }
        })
    }

    onFilterDone = () => {
        this.setState(({filter}) => {
            return {
                filter: 'done'
            }
        })    
    }

    search(items, term) {
        if (term.length === 0) {
            return items
        }

        return items.filter((item) => {
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        })
    }

    render() {
        const { todoData, term, filter } = this.state;

        const visibleItems = this.filterProperty(
                                this.search(todoData, term), filter)
        const doneCount = todoData
                            .filter((el) => el.done).length;   
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel 
                        onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter
                        onAll={this.onFilterAll}
                        onFilterActive={this.onFilterActive}
                        onFilterDone={this.onFilterDone}/>
                </div>
        
            <ToDoList 
                todos={visibleItems} 
                onDeleted={ this.deleteItem }
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone} />
            <NewItem 
                onAdd={ this.addItem}/>
            </div>
        );
    }
};
