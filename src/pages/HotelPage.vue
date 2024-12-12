<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />
    <!-- Loading or Error states -->
    <div v-if="loading" class="container mx-auto px-4 py-16 text-center">
      <p class="text-2xl text-gray-600">Loading hotel information...</p>
    </div>
    <div v-else-if="error" class="container mx-auto px-4 py-16 text-center">
      <p class="text-2xl text-red-600">{{ error }}</p>
    </div>

    <!-- Hotel and Room Information -->
    <div v-else class="container mx-auto px-4 py-16">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="relative h-96">
          <img :src="hotel.image" :alt="hotel.name" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 class="text-4xl md:text-5xl font-bold text-white">{{ hotel.name }}</h1>
          </div>
        </div>
        <div class="p-8">
          <p class="text-gray-600 text-lg mb-8">{{ hotel.description }}</p>
          <div>
            <div>
              <h2 class="text-2xl font-semibold text-gray-800 mb-6">Available Rooms</h2>
              <div v-if="rooms.length" class=" grid grid-cols-1 md:grid-cols-2 lg:gird-clos-3 gap-10">
                <div v-for="room in rooms" :key="room.id" class="bg-gray-50 p-6 rounded-lg shadow">
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ room.type }} - ${{ room.price }}</h3>
                  <p class="text-gray-600 mb-4">{{ room.description }}</p>
                  <button @click="openReservationModal(room)"
                    class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
                    Reserve
                  </button>
                </div>
              </div>
              <p v-else class="text-gray-600">No rooms available at the moment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reservation Modal -->
    <ReservationModal :show="showReservationModal" :reservation-data="reservationData"
      @closeModal="closeReservationModal" @confirmReservation="confirmReservation" />
  </div>
</template>

<script>
import apiClient from '@/axios';
import NavBar from '@/components/Navbar.vue';
import ReservationModal from '@/components/ReservationModal.vue'; // Import Modal

export default {
  name: 'HotelPage',
  components: {
    NavBar,
    ReservationModal
  },
  data() {
    return {
      hotel: null,
      rooms: [],
      loading: true,
      error: null,
      showReservationModal: false,
      reservationData: {
        hotel_id: null,
        room_id: null,
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        check_in: '',
        check_out: '',
        status: false,
      }
    };
  },
  methods: {
    async fetchHotel() {
      this.loading = true;
      this.error = null;
      try {
        const hotelId = this.$route.params.id;
        const [hotelResponse, roomsResponse] = await Promise.all([
          apiClient.get(`/hotels/${hotelId}`),
          apiClient.get(`/hotels/${hotelId}/rooms`)
        ]);
        this.hotel = hotelResponse.data.data;
        this.rooms = roomsResponse.data.data;
      } catch (error) {
        this.error = 'Failed to load hotel information. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    openReservationModal(room) {
      this.reservationData.hotel_id = this.hotel.id;
      this.reservationData.room_id = room.id;
      this.showReservationModal = true;
    },
    closeReservationModal() {
      this.showReservationModal = false;
      this.resetReservationData();
    },
    resetReservationData() {
      this.reservationData = {
        hotel_id: null,
        room_id: null,
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        check_in: '',
        check_out: '',
        status: false,
      };
    },
    async confirmReservation() {
      try {
        await apiClient.post('/reservations', this.reservationData);
        this.closeReservationModal();
        alert('Reservation confirmed successfully!');
      } catch (error) {
        console.error('Error confirming reservation:', error);
        alert('Failed to confirm reservation. Please try again.');
      }
    }
  },
  mounted() {
    this.fetchHotel();
  }
};
</script>
