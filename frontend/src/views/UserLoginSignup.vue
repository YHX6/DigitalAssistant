<!-- <template>
    <div>
        <h1>User Login/Signup</h1>

        <form @submit.prevent="handleSubmit">
            <div>
                <label>Email:</label>
                <input type="email" v-model="email" required>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" v-model="password" required>
            </div>
            <div>
                <button type="submit">Login</button>
                <button @click="handleSignup">Go SignUp</button>
            </div>
        </form>
    </div>
</template> -->
<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="handleSubmit" >
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input id="email" name="email" type="email" v-model="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
  
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div class="text-sm">
                <!-- <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a> -->
              </div>
            </div>
            <div class="mt-2">
              <input id="password" name="password" type="password" v-model="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
  
          <div class="flex flex-row gap-2">
            <button type="submit" class="flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log In</button>
            <button type="submit" @click="handleSignup" class="flex w-1/2 justify-center rounded-md bg-indigo-200 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>
  
      </div>
    </div>
  </template>

<script>
// import {useAuthStore} from "../stores/auth";
import axios from 'axios';


export default {
    name: "UserLoginSignup",
    data() {
        return {
            email: "",
            password: "",
        }
    },
    methods: {
      async handleSubmit() {
            try {
                const response = await axios.post('http://localhost:3000/api/users/login', {
                    email: this.email,
                    password: this.password
                });
                if (response.status === 200) {
                    this.$router.push("/personal-info");
                    sessionStorage.setItem("digital_user", this.email);
                }
            } catch (error) {
                console.error('Login failed:', error.response ? error.response.data : error.message);
                alert('Login failed');
            }
        },
        async handleSignup() {
            try {
                const response = await axios.post('http://localhost:3000/api/users/create', {
                    email: this.email,
                    password: this.password
                });
                if (response.status === 201) {
                    this.$router.push("/personal-info");
                    sessionStorage.setItem("digital_user", this.email);
                }
            } catch (error) {
                console.error('Signup failed:', error.response ? error.response.data : error.message);
                alert('Signup failed');
            }
        }
    }
}
</script>