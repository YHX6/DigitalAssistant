import { createRouter, createWebHistory } from 'vue-router';

import UserLoginSignup from "../views/UserLoginSignup.vue";
import PersonalInfo from '../views/PersonalInfo.vue';
import TodoList from '../views/TodoList.vue';
import Notes from '../views/Notes.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: UserLoginSignup
    },
    {
      path:'/personal-info',
      name: "PersonalInfo",
      component: PersonalInfo,
    },
    {
      path: '/todo-list',
      name: 'TodoList',
      component: TodoList
    },
    {
      path: '/notes',
      name: 'Notes',
      component: Notes
    }
  ]
})

export default router
