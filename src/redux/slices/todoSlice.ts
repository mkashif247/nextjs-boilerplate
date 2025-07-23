import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
}

const initialState: TodoState = {
    todos: [],
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            state.todos.push({
                id: Math.random().toString(36).substring(2, 9),
                text: action.payload,
                completed: false,
            });
        },
        toggleTodo: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find((t) => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((t) => t.id !== action.payload);
        },
    },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer; 