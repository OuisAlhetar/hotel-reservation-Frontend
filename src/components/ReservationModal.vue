<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
      <h2 class="text-2xl font-semibold mb-4">Make a Reservation</h2>
      <form @submit.prevent="submitReservation">
        <div class="mb-4">
          <label for="customerName" class="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="customerName" v-model="reservationData.customer_name" required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <div class="mb-4">
          <label for="customerEmail" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="customerEmail" v-model="reservationData.customer_email" required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <div class="mb-4">
          <label for="customerPhone" class="block text-sm font-medium text-gray-700">Phone</label>
          <input type="tel" id="customerPhone" v-model="reservationData.customer_phone" required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <div class="mb-4">
          <label for="checkIn" class="block text-sm font-medium text-gray-700">Check-in Date</label>
          <input type="date" id="checkIn" v-model="reservationData.check_in" required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <div class="mb-4">
          <label for="checkOut" class="block text-sm font-medium text-gray-700">Check-out Date</label>
          <input type="date" id="checkOut" v-model="reservationData.check_out" required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </div>
        <div class="flex justify-end space-x-2">
          <button type="button" @click="closeModal"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-300">
            Cancel
          </button>
          <button type="submit" :disabled="loading"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
            Confirm Reservation
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReservationModal",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    reservationData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async submitReservation() {
      this.loading = true;
      try {
        await this.$emit("confirmReservation"); // Emit the event to parent without handling the request here
        this.loading = false;
      } catch (error) {
        console.error("Error confirming reservation:", error);
        this.loading = false;
        alert("Failed to confirm reservation. Please try again.");
      }
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>
