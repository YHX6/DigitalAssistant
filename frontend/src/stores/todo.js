import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", {
    state: () => ({
        todoList : []
    }),
    actions: {
        addTodo(todo) {
            this.todoList.push(todo);
        },
        updateTodo(index, updatedTodo) {
            this.todoList[index] = updatedTodo;
        },
        deleteTodo(index){
            this.todoList.splice(index, 1);
        }
    }
})