<template>
  <div>
    <NavBar />
    <div class="flex justify-center items-center min-h-screen bg-gray-50 py-12">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-3xl font-semibold text-center mb-6">Signup</h1>
        <form @submit.prevent="signup">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="username">Username</label>
            <input type="text" id="username" v-model="form.username"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="email">Email</label>
            <input type="email" id="email" v-model="form.email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="password">Password</label>
            <input type="password" id="password" v-model="form.password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="password_confirmation">Confirm Password</label>
            <input type="password" id="password_confirmation" v-model="form.password_confirmation"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="first_name">First Name</label>
            <input type="text" id="first_name" v-model="form.first_name"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="last_name">Last Name</label>
            <input type="text" id="last_name" v-model="form.last_name"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2" for="phone">Phone (optional)</label>
            <input type="tel" id="phone" v-model="form.phone"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 mb-2" for="address">Address (optional)</label>
            <input type="text" id="address" v-model="form.address"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
          </div>
          <button type="submit"
            class="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">Sign
            Up</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/Navbar.vue'
import apiClient from '@/axios'

export default {
  name: 'SignupPage',
  components: {
    NavBar
  },
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        first_name: '',
        last_name: '',
        phone: '',
        address: ''
      }
    }
  },
  methods: {
    async signup() {
      try {
        const response = await apiClient.post('/register', this.form)
        const token = response.data.access_token
        localStorage.setItem('auth_token', token)
        this.$router.push('/')
      } catch (error) {
        console.error('Signup failed:', error)
        // Handle error (e.g., show error messages to the user)
      }
    }
  }
}
</script>