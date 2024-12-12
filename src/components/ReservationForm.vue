<template>
  <div class="bg-white rounded-lg shadow-lg p-8">
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">Make a Reservation</h2>
    <form @submit.prevent="submitReservation" class="space-y-4">
      <div>
        <label for="checkIn" class="block text-sm font-medium text-gray-700">Check-in Date</label>
        <input type="date" id="checkIn" v-model="checkIn"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
      </div>
      <div>
        <label for="checkOut" class="block text-sm font-medium text-gray-700">Check-out Date</label>
        <input type="date" id="checkOut" v-model="checkOut"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
      </div>
      <div>
        <label for="guests" class="block text-sm font-medium text-gray-700">Number of Guests</label>
        <select id="guests" v-model="guests"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
          <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>
      <button type="submit"
        class="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300">
        Reserve Now
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ReservationForm',
  data() {
    return {
      checkIn: '',
      checkOut: '',
      guests: 1
    }
  },
  methods: {
    submitReservation() {
      // Handle reservation submission
      console.log('Reservation submitted:', { checkIn: this.checkIn, checkOut: this.checkOut, guests: this.guests });
      // You would typically make an API call here
    }
  }
}
</script>