<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />
    <div class="container mx-auto px-4 py-16">
      <h1 class="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <!-- Hotel Management -->
      <hotel-management :hotels="hotels" @add-hotel="addHotel" @update-hotel="updateHotel"
        @delete-hotel="deleteHotel" />

      <!-- Room Management -->
      <room-management :rooms="rooms" @add-room="addRoom" @update-room="updateRoom" @delete-room="deleteRoom" />

      <!-- User Management -->
      <user-management :users="users" />

      <!-- Reservation Management -->
      <reservation-management :reservations="reservations" @cancel-reservation="cancelReservation" />
    </div>
  </div>
</template>

<script>
import HotelManagement from '@/components/HotelManagement.vue';
import RoomManagement from '@/components/RoomManagement.vue';
import UserManagement from '@/components/UserManagement.vue';
import ReservationManagement from '@/components/ReservationManagement.vue';
import apiClient from '@/axios';
import NavBar from '@/components/Navbar.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name:'Dashboard',
  components: {
    HotelManagement,
    RoomManagement,
    UserManagement,
    ReservationManagement,
    NavBar,
  },
  data() {
    return {
      hotels: [],
      rooms: [],
      users: [],
      reservations: []
    };
  },
  mounted() {
    this.fetchDashboardData();
  },
  methods: {
    async fetchDashboardData() {
      const response = await apiClient.get('/dashboard');
      this.hotels = response.data.hotels;
      this.rooms = response.data.rooms;
      this.users = response.data.users;
      this.reservations = response.data.reservations;
    },

    // Hotel Management
    async addHotel(hotel) {
      await apiClient.post('/hotels', hotel);
      this.fetchDashboardData();
    },
    async updateHotel(hotel) {
      await apiClient.put(`/hotels/${hotel.id}`, hotel);
      this.fetchDashboardData();
    },
    async deleteHotel(id) {
      await apiClient.delete(`/hotels/${id}`);
      this.fetchDashboardData();
    },

    // Room Management
    async addRoom(room) {
      await apiClient.post(`/hotels/${room.hotel_id}/rooms`, room);
      this.fetchDashboardData();
    },
    async updateRoom(room) {
      await apiClient.put(`/rooms/${room.id}`, room);
      this.fetchDashboardData();
    },
    async deleteRoom(id) {
      await apiClient.delete(`/rooms/${id}`);
      this.fetchDashboardData();
    },

    // Reservation Management
    async cancelReservation(id) {
      await apiClient.delete(`/reservations/${id}`);
      this.fetchDashboardData();
    }
  }
};
</script>
