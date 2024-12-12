<template>
  <NavBar />
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Log in to your account
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="login">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input id="email" name="email" type="email" autocomplete="email" required v-model="email"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input id="password" name="password" type="password" autocomplete="current-password" required
                v-model="password"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            </div>
          </div>

          <div>
            <button type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Log in
            </button>
          </div>
        </form>
        <h6 class="mt-5 text-center">
          don't have an account?
          <RouterLink to="/signup">
            <button class="bg-blue-700 rounded px-2 py-1 text-white">
              Sing-up
            </button>
          </RouterLink>
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/axios'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await apiClient.post('/login', {
          email: this.email,
          password: this.password
        });
        const token = response.data.access_token;
        localStorage.setItem('auth_token', token);

        // Fetch user profile to check role
        const profileResponse = await apiClient.get('/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        
        // Redirect based on user role
        const isAdmin = profileResponse.data.data.role === 'admin';
        // console.log("profileResponse.data.role",profileResponse.data.role);
        // console.log("profileResponse.data.data",profileResponse.data.data);
        // console.log("profileResponse.data.data.role",profileResponse.data.data.role);
        this.$router.push(isAdmin ? '/dashboard' : '/'); // Admin -> Dashboard, User -> Home

      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }
}
</script>
