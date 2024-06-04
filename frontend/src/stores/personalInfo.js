// import { defineStore } from "pinia";

// export const usePersonalInfoStore = defineStore("personalInfo", {
//     state: () => ({
//         name: "",
//         email: "",
//         phoneNumber: "",
//     }),
//     actions: {
//         updatePersonalInfo(info){
//             console.log("qwe");
//             this.name = info.name;
//             this.email = info.email;
//             this.phoneNumber = info.phoneNumber;
//         }
//     }
// })

import { defineStore } from "pinia";

export const usePersonalInfoStore = defineStore("personalInfo", {
  state: () => ({
    name: "",
    email: "",
    phoneNumber: "",
  }),
  actions: {
    updatePersonalInfo(info) {
      console.log("Store action called");
      this.name = info.name;
      this.email = info.email;
      this.phoneNumber = info.phoneNumber;
    }
  }
});
