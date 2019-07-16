import React, { Component } from "react";
import AppHeader from "../App-header/app-header";
import TodoList from "../todo-list/todo-list";
import SearchPanel from "../search-panel/search-panel";
import ItemAddForm from  "../item-add-form/item-add-form";
import ItemStatusFilter from "../item-status-filter/item-status-filter";


export default class App extends Component {
    maxID = 100;
    state = {
        todoData: [
            this.createTodoItem("Drink Cofee"),
            this.createTodoItem("Make Awesome App"),
            this.createTodoItem("Have A Lunch")
        ],
        term: "",
        filter: "done"
    };
    createTodoItem(label) {
        return{
            label,
            important:false,
            done:false,
            id: this.maxID++
        }
    }
    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            todoData.slice(idx, 1);
            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);
            const newArray = [...before, ...after];
            return {
                todoData: newArray
            };
        })
    };
    addItem = (text) => {
        // console.log("text");
        const newItem = this.createTodoItem(text);
        this.setState(({todoData})=>{
            const newArr = [
                ...todoData,newItem
            ];
            return {
                todoData:newArr
            };
        });
    };
    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el)=> el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem,
            [propName]: !oldItem[propName]};
       return [
            ...arr.slice(0,idx),
            newItem,
            ...arr.slice(idx+1)
        ];

    }
    onToggleDone = (id) => {
        this.setState(({ todoData})=>{
            return {
                todoData: this.toggleProperty(todoData, id, "done")
            };
        })
    };
    onToggleImportant = (id) => {
        this.setState(({ todoData})=>{
            return {
                todoData: this.toggleProperty(todoData, id, "important")
            };
        });
    };
    onSearchChange = (term) => {
        this.setState({term});
    };
    onFilterChange = (filter) => {
        this.setState({filter});
    };
    search(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item)=>{
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase())> -1;
        });
    };
    filter(items, filter){
        switch (filter) {
            case "all":
                return items;
            case "active":
                return items.filter((item)=> !item.done);
            case "done":
                return items.filter((item)=> item.done);
            default:
                return items;
        }
    };

    render() {
        const { todoData, term, filter} = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((el)=> el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div className="todo-main">

                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel
                    onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter
                        filter = {filter}
                        onFilterChange={this.onFilterChange}/>
                </div>

                <TodoList todos={visibleItems}
                          onDeleted={this.deleteItem}
                          onToggleImportant={this.onToggleImportant}
                          onToggleDone={this.onToggleDone}/>
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        )
    }
}


