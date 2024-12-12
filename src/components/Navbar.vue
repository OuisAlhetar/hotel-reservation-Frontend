<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <a href="/" class="text-2xl font-bold text-blue-600">🏨 LuxStay</a>
        <div class="space-x-6 flex items-center">
          <!-- Always show Home link -->
          <router-link to="/" class="text-gray-600 hover:text-blue-600 transition-colors">Home</router-link>

          <!-- Conditionally show Login and Signup links if user is not logged in -->
          <router-link v-if="!isLoggedIn" to="/login"
            class="text-gray-600 hover:text-blue-600 transition-colors">Login</router-link>
          <router-link v-if="!isLoggedIn" to="/signup"
            class="text-gray-600 hover:text-blue-600 transition-colors">Signup</router-link>

          <!-- Conditionally show Dashboard and Profile links for admin -->
          <router-link v-if="isAdmin" to="/dashboard"
            class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
            Dashboard
          </router-link>

          <!-- Show Profile Icon when regular user is logged in -->
          <router-link v-if="!isAdmin && isLoggedIn" to="/profile">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Profile"
              class="h-8 w-8 rounded-full border-2 border-gray-300" />
          </router-link>

          <!-- Logout Button -->
          <button v-if="isLoggedIn" @click="logout"
            class="text-gray-600 hover:text-blue-600 transition-colors">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import apiClient from '@/axios';

export default {
  name: 'NavBar',
  data() {
    return {
      isLoggedIn: false, // State to track if user is logged in
      isAdmin: false     // State to track if the user is an admin
    };
  },
  mounted() {
    this.checkAuthStatus(); // Check login status and role when the component is mounted
  },
  methods: {
    async checkAuthStatus() {
      // Check if the token exists in localStorage to determine login status
      const token = localStorage.getItem('auth_token');
      this.isLoggedIn = !!token;

      // If logged in, check if the user is an admin
      if (this.isLoggedIn) {
        try {
          const response = await apiClient.get('/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          // Assuming API returns a 'role' field (admin or user)
          this.isAdmin = response.data.role === 'admin';
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    },
    async logout() {
      try {
        // Make API request to log out
        await apiClient.post('/logout');
        // Remove the token from localStorage
        localStorage.removeItem('auth_token');
        // Update login state and redirect to login page
        this.isLoggedIn = false;
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
        alert('Failed to log out. Please try again.');
      }
    }
  }
};
</script>

<style scoped>
/* Add any additional styles for your navbar here */
</style>
