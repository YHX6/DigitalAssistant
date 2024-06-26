
<template>
    <NavigationMenu></NavigationMenu>
  
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Note Management</h1>
      <form @submit.prevent="addNote" class="mb-4 flex flex-col md:flex-row items-start md:items-center">
        <div class="flex-1 mb-2 md:mb-0 md:mr-2">
          <label class="block text-sm font-medium text-gray-700">New Note:</label>
          <textarea
            v-model="newNote"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
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
          v-for="(note, index) in notesList"
          :key="note._id"
          class="flex flex-col md:flex-row items-start md:items-center"
        >
          <textarea
            v-model="note.content"
            class="flex-1 mb-2 md:mb-0 md:mr-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
          <button
            @click="updateNote(note._id, note.content)"
            class="inline-flex items-center px-4 py-2 mb-2 md:mb-0 md:mr-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Update
          </button>
          <button
            @click="deleteNote(note._id)"
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
    name: 'Notes',
    data() {
      return {
        newNote: '',
        notesList: []
      };
    },
    components: {
      NavigationMenu
    },
    methods: {
      async fetchNotes() {
        try {
          const email = sessionStorage.getItem('digital_user');
          const response = await axios.get(`http://localhost:3000/api/notes/${email}`);
          this.notesList = response.data;
        } catch (error) {
          console.error('Failed to fetch notes:', error);
        }
      },
      async addNote() {
        try {
          const email = sessionStorage.getItem('digital_user');
          const response = await axios.post('http://localhost:3000/api/notes/create', {
            email,
            content: this.newNote
          });
          this.notesList.push(response.data);  
          this.newNote = '';
          alert('Note added successfully');
        } catch (error) {
          console.error('Failed to add note:', error);
          alert('Failed to add note');
        }
      },
      async updateNote(noteId, content) {
        try {
          await axios.put(`http://localhost:3000/api/notes/update/${noteId}`, {
            content
          });
          alert('Note updated successfully');
        } catch (error) {
          console.error('Failed to update note:', error);
          alert('Failed to update note');
        }
      },
      async deleteNote(noteId) {
        try {
          await axios.delete(`http://localhost:3000/api/notes/delete/${noteId}`);
          this.notesList = this.notesList.filter(note => note._id !== noteId);  // Remove the deleted note from the list
          alert('Note deleted successfully');
        } catch (error) {
          console.error('Failed to delete note:', error);
          alert('Failed to delete note');
        }
      }
    },
    mounted() {
      this.fetchNotes();
    }
  };
  </script>
  