 <template>
  <NavigationMenu></NavigationMenu>

  <div class="bg-gray-100">
    <div class="container mx-auto py-8">
      <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
        <div class="col-span-4 sm:col-span-3">
          <div class="bg-white shadow rounded-lg p-6 min-w-[230px]">
            <div class="flex flex-col items-center">
              <img
                src="../assets/profile.jpeg"
                class="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
              />

              <h1 class="text-xl font-bold">Profile</h1>
              <!-- <form @submit.prevent="updatePersonalInfo" class="text-gray-700 flex flex-col gap-2">
                <div>
                  <label>Name:</label>
                  <input type="text" v-model="name" />
                </div>
                <div>
                  <label>Email:</label>
                  <input type="email" v-model="email" disabled />
                </div>
                <div>
                  <label>Phone Number:</label>
                  <input type="text" v-model="phoneNumber" />
                </div>
                <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  Update
                </button>
              </form> -->
              <form @submit.prevent="updatePersonalInfo" class="text-gray-700 flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                  <label class="font-semibold text-lg">Name:</label>
                  <input type="text" v-model="name" class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div class="flex flex-col gap-2">
                  <label class="font-semibold text-lg">Email:</label>
                  <input type="email" v-model="email" disabled class="border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div class="flex flex-col gap-2">
                  <label class="font-semibold text-lg">Phone Number:</label>
                  <input type="text" v-model="phoneNumber" class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold">
                  Update
                </button>
              </form>

            </div>
          </div>
        </div>
        <div class="col-span-4 sm:col-span-9">
          <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-xl font-bold mb-4">About Me</h2>
            <p class="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae tortor ullamcorper, ut
              vestibulum velit convallis. Aenean posuere risus non velit egestas suscipit. Nunc finibus vel ante id
              euismod. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam
              erat volutpat. Nulla vulputate pharetra tellus, in luctus risus rhoncus id.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import NavigationMenu from '../components/NavigationMenu.vue';

const name = ref('');
const email = ref('');
const phoneNumber = ref('');

const fetchUserInfo = async () => {
  try {
    const userEmail = sessionStorage.getItem('digital_user');
    if (userEmail) {
      const response = await axios.get(`http://localhost:3000/api/users/${userEmail}`);
      const userData = response.data;
      name.value = userData.name;
      email.value = userData.email;
      phoneNumber.value = userData.phoneNumber;
    }
  } catch (error) {
    console.error('Failed to fetch user info:', error);
  }
};

const updatePersonalInfo = async () => {
  try {
    const userEmail = sessionStorage.getItem('digital_user');
    await axios.put('http://localhost:3000/api/users/update', {
      email: userEmail,
      name: name.value,
      phoneNumber: phoneNumber.value,
    });
    alert('Profile updated successfully');
  } catch (error) {
    console.error('Failed to update personal info:', error);
    alert('Failed to update profile');
  }
};

onMounted(() => {
  fetchUserInfo();
});
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
