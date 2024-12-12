<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />
    <header class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div class="container mx-auto px-4 py-16">
        <h1 class="text-5xl md:text-6xl font-bold mb-4">Find Your Dream Stay</h1>
        <p class="text-xl md:text-2xl mb-8">Discover amazing hotels and book your perfect getaway</p>
        <a href="#hotels"
          class="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300">
          Explore Hotels
        </a>
      </div>
    </header>

    <section id="hotels" class="container mx-auto mt-16 px-4">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Featured Hotels</h2>
      <div class="relative">
        <button @click="prevSlide"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button @click="nextSlide"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div class="overflow-hidden">
          <div class="flex transition-transform duration-300 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <div v-for="hotel in hotels" :key="hotel.id" class="w-full flex-shrink-0 px-4">
              <HotelCard :hotel="hotel" @click="goToHotelPage(hotel.id)" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto mt-16 px-4 mb-16">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <h3 class="text-xl font-semibold mb-2">Best Prices</h3>
          <p class="text-gray-600">We guarantee the best prices for your stay</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-semibold mb-2">24/7 Support</h3>
          <p class="text-gray-600">Our team is always here to help you</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-semibold mb-2">Verified Hotels</h3>
          <p class="text-gray-600">All our hotels are carefully selected and verified</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/Navbar.vue'
import HotelCard from '@/components/HotelCard.vue'
import apiClient from '@/axios'

export default {
  name: 'HomePage',
  components: {
    NavBar,
    HotelCard
  },
  data() {
    return {
      hotels: [],
      currentSlide: 0
    }
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.hotels.length
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.hotels.length) % this.hotels.length
    },
    async fetchHotels() {
      try {
        const response = await apiClient.get('/hotels')
        this.hotels = response.data.data
      } catch (error) {
        console.error('Error fetching hotels:', error)
      }
    },
    goToHotelPage(hotelId) {
      this.$router.push({ name: 'Hotel', params: { id: hotelId } })
    }
  },
  mounted() {
    this.fetchHotels()
  }
}
</script>