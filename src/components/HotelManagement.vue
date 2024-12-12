<!-- components/HotelManagement.vue -->
<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Manage Hotels</h2>
    <button @click="openAddHotelModal" class="bg-green-500 text-white px-4 py-2 mb-4 rounded-md hover:bg-green-600">Add Hotel</button>

    <div v-if="hotels.length">
      <div v-for="hotel in hotels" :key="hotel.id" class="bg-gray-50 p-4 mb-4 rounded-md shadow">
        <p class="text-xl font-bold">{{ hotel.name }}</p>
        <p>{{ hotel.description }}</p>
        <p>{{ hotel.address }}, {{ hotel.city }}, {{ hotel.province }}, {{ hotel.country }}</p>
        <p>Rating: {{ hotel.rating }}</p>
        <img :src="hotel.image_url" alt="Hotel Image" class="h-40 w-full object-cover rounded-md my-2" />
        <button @click="openEditHotelModal(hotel)" class="text-blue-500">Edit</button>
        <button @click="confirmDeleteHotel(hotel.id)" class="text-red-500 ml-2">Delete</button>
      </div>
    </div>

    <!-- Hotel Modal for Add/Edit -->
    <modal v-if="showHotelModal" @close="closeHotelModal">
      <h2 class="text-xl font-semibold mb-4">{{ editMode ? 'Edit Hotel' : 'Add Hotel' }}</h2>
      <form @submit.prevent="editMode ? updateHotel() : addHotel()">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Hotel Name</label>
          <input v-model="hotelForm.name" type="text" id="name" class="w-full p-2 border rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea v-model="hotelForm.description" id="description" class="w-full p-2 border rounded-md" required></textarea>
        </div>
        <div class="mb-4">
          <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
          <input v-model="hotelForm.address" type="text" id="address" class="w-full p-2 border rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="city" class="block text-sm font-medium text-gray-700">City</label>
          <input v-model="hotelForm.city" type="text" id="city" class="w-full p-2 border rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="province" class="block text-sm font-medium text-gray-700">Province</label>
          <input v-model="hotelForm.province" type="text" id="province" class="w-full p-2 border rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
          <input v-model="hotelForm.country" type="text" id="country" class="w-full p-2 border rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="rating" class="block text-sm font-medium text-gray-700">Rating</label>
          <input v-model="hotelForm.rating" type="number" step="0.01" id="rating" class="w-full p-2 border rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="image_url" class="block text-sm font-medium text-gray-700">Image URL</label>
          <input v-model="hotelForm.image_url" type="text" id="image_url" class="w-full p-2 border rounded-md" required />
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
          {{ editMode ? 'Update Hotel' : 'Add Hotel' }}
        </button>
      </form>
    </modal>

    <!-- Delete Confirmation Modal -->
    <modal v-if="showDeleteHotelModal" @close="closeHotelModal">
      <h2 class="text-xl font-semibold mb-4">Are you sure you want to delete this hotel?</h2>
      <button @click="deleteHotel" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Delete</button>
      <button @click="closeHotelModal" class="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancel</button>
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  name: 'HotelManagement',
  components: { Modal },
  props: ['hotels'],
  data() {
    return {
      hotelForm: {
        id: null,
        name: '',
        description: '',
        address: '',
        city: '',
        province: '',
        country: '',
        rating: '',
        image_url: ''
      },
      showHotelModal: false,
      showDeleteHotelModal: false,
      editMode: false,
      hotelIdToDelete: null
    };
  },
  methods: {
    openAddHotelModal() {
      this.resetForm();
      this.showHotelModal = true;
      this.editMode = false;
    },
    openEditHotelModal(hotel) {
      this.hotelForm = { ...hotel }; // Fill the form with hotel data
      this.showHotelModal = true;
      this.editMode = true;
    },
    closeHotelModal() {
      this.showHotelModal = false;
      this.showDeleteHotelModal = false;
      this.resetForm();
    },
    resetForm() {
      this.hotelForm = {
        id: null,
        name: '',
        description: '',
        address: '',
        city: '',
        province: '',
        country: '',
        rating: '',
        image_url: ''
      };
    },
    async addHotel() {
      try {
        await this.$emit('add-hotel', this.hotelForm);
        this.closeHotelModal();
      } catch (error) {
        console.error('Error adding hotel:', error);
      }
    },
    async updateHotel() {
      try {
        await this.$emit('update-hotel', this.hotelForm);
        this.closeHotelModal();
      } catch (error) {
        console.error('Error updating hotel:', error);
      }
    },
    confirmDeleteHotel(id) {
      this.hotelIdToDelete = id;
      this.showDeleteHotelModal = true;
    },
    async deleteHotel() {
      try {
        await this.$emit('delete-hotel', this.hotelIdToDelete);
        this.closeHotelModal();
      } catch (error) {
        console.error('Error deleting hotel:', error);
      }
    }
  }
};
</script>
