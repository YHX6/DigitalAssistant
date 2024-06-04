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

              <h1 class="text-xl font-bold">个人信息</h1>
              <form @submit.prevent="updatePersonalInfo" class="text-gray-700 flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                  <label class="font-semibold text-lg">姓名:</label>
                  <input type="text" v-model="name" class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div class="flex flex-col gap-2">
                  <label class="font-semibold text-lg">邮箱:</label>
                  <input type="email" v-model="email" disabled class="border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div class="flex flex-col gap-2">
                  <label class="font-semibold text-lg">手机号:</label>
                  <input type="text" v-model="phoneNumber" class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold">
                  修改
                </button>
              </form>

            </div>
          </div>
        </div>
        <div class="col-span-4 sm:col-span-9">
          <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-xl font-bold mb-4">介绍</h2>
            <p class="text-gray-700">
              我是一名充满好奇心的学生，热爱探索各种学科知识并不断挑战自我。学习对我来说不仅是获取知识的过程，更是发现新事物和解决问题的机会。我喜欢在团队中合作，与同学们一起完成项目和任务，共同进步。我也积极参加各种课外活动，培养自己的多方面能力。我相信通过不断的努力和学习，我可以为未来的事业和生活打下坚实的基础，成为一个对社会有贡献的人。
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
