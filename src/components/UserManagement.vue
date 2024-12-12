<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">User Management</h2>
    <div class="space-y-4">
      <div v-for="user in users" :key="user.id" class="bg-gray-50 p-4 rounded-md">
        <h3 class="text-lg font-medium text-gray-800">{{ user.name }}</h3>
        <p class="text-gray-600">{{ user.email }}</p>
        <p class="text-gray-600">Role: {{ user.role }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserManagement',
  props: ['users']
};
</script>