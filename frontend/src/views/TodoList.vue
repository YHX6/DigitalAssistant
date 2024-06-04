<!-- <template>
   <NavigationMenu></NavigationMenu>

    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Todo List Management</h1>
      <form @submit.prevent="addTodo" class="mb-4 flex flex-col md:flex-row items-start md:items-center">
        <div class="flex-1 mb-2 md:mb-0 md:mr-2">
          <label class="block text-sm font-medium text-gray-700">New Todo:</label>
          <input
            type="text"
            v-model="newTodo"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add
        </button>
      </form>
      <ul class="space-y-4">
        <li
          v-for="(todo, index) in todoList"
          :key="index"
          class="flex flex-col md:flex-row items-start md:items-center"
        >
          <input
            type="text"
            v-model="todo.text"
            class="flex-1 mb-2 md:mb-0 md:mr-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            @click="updateTodo(index, todo)"
            class="inline-flex items-center px-4 py-2 mb-2 md:mb-0 md:mr-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Update
          </button>
          <button
            @click="deleteTodo(index)"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
    import { useTodoStore } from '../stores/todo';
    import NavigationMenu from '../components/NavigationMenu.vue';
  
  export default {
    name: 'TodoList',
    data() {
      return {
        newTodo: ''
      };
    },
    components: {
      NavigationMenu
    },
    computed: {
      todoList() {
        return this.todoStore.todoList;
      }
    },
    methods: {
      addTodo() {
        this.todoStore.addTodo({
          text: this.newTodo,
          completed: false
        });
        this.newTodo = '';
      },
      updateTodo(index, todo) {
        this.todoStore.updateTodo(index, todo);
      },
      deleteTodo(index) {
        this.todoStore.deleteTodo(index);
      }
    },
    setup() {
      const todoStore = useTodoStore();
      return { todoStore };
    }
  };
  </script>
   -->

   <template>
    <NavigationMenu></NavigationMenu>
  
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Todo List Management</h1>
      <form @submit.prevent="addTodo" class="mb-4 flex flex-col md:flex-row items-start md:items-center">
        <div class="flex-1 mb-2 md:mb-0 md:mr-2">
          <label class="block text-sm font-medium text-gray-700">New Todo:</label>
          <input
            type="text"
            v-model="newTodo"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add
        </button>
      </form>
      <ul class="space-y-4">
        <li
          v-for="(todo, index) in todoList"
          :key="todo._id"
          class="flex flex-col md:flex-row items-start md:items-center"
        >
          <input
            type="text"
            v-model="todo.content"
            class="flex-1 mb-2 md:mb-0 md:mr-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            @click="updateTodo(todo._id, todo.content)"
            class="inline-flex items-center px-4 py-2 mb-2 md:mb-0 md:mr-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Update
          </button>
          <button
            @click="deleteTodo(todo._id)"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import NavigationMenu from '../components/NavigationMenu.vue';
  
  export default {
    name: 'TodoList',
    data() {
      return {
        newTodo: '',
        todoList: []
      };
    },
    components: {
      NavigationMenu
    },
    methods: {
      async fetchTodos() {
        try {
          const email = sessionStorage.getItem('digital_user');
          const response = await axios.get(`http://localhost:3000/api/todos/${email}`);
          this.todoList = response.data;
        } catch (error) {
          console.error('Failed to fetch todos:', error);
        }
      },
      async addTodo() {
        try {
          const email = sessionStorage.getItem('digital_user');
          const response = await axios.post('http://localhost:3000/api/todos/create', {
            email,
            content: this.newTodo
          });
          this.todoList.push(response.data);  // Add the new todo to the list
          this.newTodo = '';
          alert('Todo added successfully');
        } catch (error) {
          console.error('Failed to add todo:', error);
          alert('Failed to add todo');
        }
      },
      async updateTodo(todoId, content) {
        try {
          await axios.put(`http://localhost:3000/api/todos/update/${todoId}`, {
            content
          });
          alert('Todo updated successfully');
        } catch (error) {
          console.error('Failed to update todo:', error);
          alert('Failed to update todo');
        }
      },
      async deleteTodo(todoId) {
        try {
          await axios.delete(`http://localhost:3000/api/todos/delete/${todoId}`);
          this.todoList = this.todoList.filter(todo => todo._id !== todoId);  // Remove the deleted todo from the list
          alert('Todo deleted successfully');
        } catch (error) {
          console.error('Failed to delete todo:', error);
          alert('Failed to delete todo');
        }
      }
    },
    mounted() {
      this.fetchTodos();
    }
  };
  </script>
  