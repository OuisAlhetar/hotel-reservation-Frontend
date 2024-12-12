<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Reservation Management</h2>
    <div class="space-y-4">
      <div v-for="reservation in reservations" :key="reservation.id" class="bg-gray-50 p-4 rounded-md">
        <h3 class="text-lg font-medium text-gray-800">Reservation #{{ reservation.id }}</h3>
        <p class="text-gray-600">Guest: {{ reservation.guest_name }}</p>
        <p class="text-gray-600">Check-in: {{ reservation.check_in_date }}</p>
        <p class="text-gray-600">Check-out: {{ reservation.check_out_date }}</p>
        <button @click="cancelReservation(reservation.id)" class="mt-2 text-red-500 hover:text-red-600 transition duration-200">
          Cancel Reservation
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReservationManagement',
  props: ['reservations'],
  methods: {
    cancelReservation(id) {
      this.$emit('cancel-reservation', id);
    }
  }
};
</script>