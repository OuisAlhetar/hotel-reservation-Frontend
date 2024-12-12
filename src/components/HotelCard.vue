<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" @click="$emit('click')">
    <img :src="hotel.image" :alt="hotel.name" class="w-full h-48 object-cover">
    <div class="p-4">
      <h3 class="text-xl font-semibold mb-2">{{ hotel.name }}</h3>
      <p class="text-gray-600 mb-4">{{ hotel.description }}</p>
      <div v-if="loading" class="text-sm text-gray-600">
        Loading room information...
      </div>
      <div v-else-if="error" class="text-sm text-red-600">
        {{ error }}
      </div>
      <div v-else>
        <p class="text-sm text-gray-600">
          <span class="font-semibold">Available Rooms:</span> {{ roomsCount }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/axios';
export default {
  name: 'HotelCard',
  props: {
    hotel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      roomsCount: 0,
      loading: true,
      error: null,
    }
  },
  methods: {
    async fetchRoomsCount() {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiClient.get(`/hotels/${this.hotel.id}/rooms`);
        const rooms = response.data.data;
        this.roomsCount = rooms.length;
      } catch (error) {
        console.error('Error fetching rooms:', error);
        this.error = 'Failed to load room information.';
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchRoomsCount();
  }
}
</script>