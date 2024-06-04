import { defineStore } from 'pinia';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notesList: []
  }),
  actions: {
    addNote(note) {
      this.notesList.push(note);
    },
    updateNote(index, updatedNote) {
      this.notesList[index] = updatedNote;
    },
    deleteNote(index) {
      this.notesList.splice(index, 1);
    }
  }
});
