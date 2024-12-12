<template>
  <NavBar/>
  <div class="container mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold text-gray-800 mb-8">Profile</h1>

    <!-- Display loading indicator if data is being fetched -->
    <div v-if="loading" class="text-2xl text-gray-600">Loading your profile...</div>

    <!-- Display error message if any -->
    <div v-if="error" class="text-2xl text-red-600">{{ error }}</div>

    <!-- Display user information and reservations if no loading or error -->
    <div v-if="!loading && !error" class="bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-3xl font-semibold text-gray-800 mb-4">Welcome, {{ user.name }}</h2>
      <p class="text-gray-600 mb-4"><strong>Email:</strong> {{ user.email }}</p>
      <p class="text-gray-600 mb-4"><strong>Phone:</strong> {{ user.phone }}</p>
      <p class="text-gray-600 mb-4"><strong>Address:</strong> {{ user.address }}</p>

      <!-- Display User Reservations -->
      <h2 class="text-3xl font-semibold text-gray-800 mb-4">Your Reservations</h2>
      <div v-if="reservations.length === 0" class="text-gray-600">No reservations found.</div>
      <ul v-else>
        <li v-for="reservation in reservations" :key="reservation.id" class="mb-4 border p-4 rounded-lg">
          <p><strong>Hotel:</strong> {{ reservation.hotel_id }}</p>
          <p><strong>Room:</strong> {{ reservation.room_id }}</p>
          <p><strong>Check-In:</strong> {{ reservation.check_in }}</p>
          <p><strong>Check-Out:</strong> {{ reservation.check_out }}</p>
          <p><strong>Status:</strong> <span :class="statusClass(reservation.status)">{{ reservation.status }}</span></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import apiClient from '@/axios';
import NavBar from '@/components/Navbar.vue';
export default {
  name: 'ProfilePage',
  components: {
    NavBar
  },
  data() {
    return {
      user: null, // Store user data here
      reservations: [], // Store user reservations here
      loading: true, // Show loading while data is being fetched
      error: null // Error message
    };
  },
  mounted() {
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
        // Fetch user profile data from the backend API
        const profileResponse = await apiClient.get('/user/profile');
        this.user = profileResponse.data.data;

        // Fetch user reservations from the backend API
        const reservationResponse = await apiClient.get('/user/reservations');
        this.reservations = reservationResponse.data.data;
      } catch (error) {
        // Handle error
        this.error = 'Failed to load profile and reservations. Please try again later.';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    statusClass(status) {
      // Define classes for reservation status (CSS can be added)
      if (status === 'confirmed') return 'text-green-600 font-semibold';
      if (status === 'pending') return 'text-yellow-600 font-semibold';
      if (status === 'cancelled') return 'text-red-600 font-semibold';
      return 'text-gray-600';
    }
  }
}
</script>

<style scoped>
/* Add additional styles for profile page */
</style>
