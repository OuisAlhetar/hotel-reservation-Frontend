<!-- components/RoomManagement.vue -->
<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Manage Rooms</h2>
    <button @click="openAddRoomModal" class="bg-green-500 text-white px-4 py-2 mb-4 rounded-md hover:bg-green-600">Add
      Room</button>

    <div v-if="rooms.length">
      <div v-for="room in rooms" :key="room.id" class="bg-gray-50 p-4 mb-4 rounded-md shadow">
        <p class="text-xl font-bold">Room: {{ room.title }} (Type: {{ room.type }})</p>
        <button @click="openEditRoomModal(room)" class="text-blue-500">Edit</button>
        <button @click="confirmDeleteRoom(room.id)" class="text-red-500 ml-2">Delete</button>
      </div>
    </div>

    <!-- Room Modal for Add/Edit -->
    <modal v-if="showRoomModal" @close="closeRoomModal">
      <h2 class="text-xl font-semibold mb-4">{{ editMode ? 'Edit Room' : 'Add Room' }}</h2>
      <form @submit.prevent="editMode ? updateRoom() : addRoom()">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700">Room Title</label>
          <input v-model="roomForm.title" type="text" id="title" class="w-full p-2 border rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="type" class="block text-sm font-medium text-gray-700">Room Type</label>
          <input v-model="roomForm.type" type="text" id="type" class="w-full p-2 border rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
          <input v-model="roomForm.price" type="number" id="price" class="w-full p-2 border rounded-md" required />
        </div>
        <div class="mb-4">
          <label for="capacity" class="block text-sm font-medium text-gray-700">Capacity</label>
          <input v-model="roomForm.capacity" type="number" id="capacity" class="w-full p-2 border rounded-md"
            required />
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
          {{ editMode ? 'Update Room' : 'Add Room' }}
        </button>
      </form>
    </modal>

    <!-- Delete Confirmation Modal -->
    <modal v-if="showDeleteRoomModal" @close="closeRoomModal">
      <h2 class="text-xl font-semibold mb-4">Are you sure you want to delete this room?</h2>
      <button @click="deleteRoom" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Delete</button>
      <button @click="closeRoomModal"
        class="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancel</button>
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  name: 'RoomManagement',
  components: { Modal },
  props: ['rooms'],
  data() {
    return {
      roomForm: {
        id: null,
        title: '',
        type: '',
        price: '',
        capacity: ''
      },
      showRoomModal: false,
      showDeleteRoomModal: false,
      editMode: false,
      roomIdToDelete: null
    };
  },
  methods: {
    openAddRoomModal() {
      this.resetForm();
      this.showRoomModal = true;
      this.editMode = false;
    },
    openEditRoomModal(room) {
      this.roomForm = { ...room }; // Fill the form with room data
      this.showRoomModal = true;
      this.editMode = true;
    },
    closeRoomModal() {
      this.showRoomModal = false;
      this.showDeleteRoomModal = false;
      this.resetForm();
    },
    resetForm() {
      this.roomForm = {
        id: null,
        title: '',
        type: '',
        price: '',
        capacity: ''
      };
    },
    async addRoom() {
      try {
        await this.$emit('add-room', this.roomForm);
        this.closeRoomModal();
      } catch (error) {
        console.error('Error adding room:', error);
      }
    },
    async updateRoom() {
      try {
        await this.$emit('update-room', this.roomForm);
        console(this.roomForm)
        this.closeRoomModal();
      } catch (error) {
        console.error('Error updating room:', error);
      }
    },
    confirmDeleteRoom(id) {
      this.roomIdToDelete = id;
      this.showDeleteRoomModal = true;
    },
    async deleteRoom() {
      try {
        await this.$emit('delete-room', this.roomIdToDelete);
        this.closeRoomModal();
      } catch (error) {
        console.error('Error deleting room:', error);
      }
    }
  }
};
</script>
