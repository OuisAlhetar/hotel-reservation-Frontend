<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
      <slot></slot>
      <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-gray-800">&times;</button>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Modal'
};
</script>

<style scoped>
/* Modal background */
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);
}

.bg-white {
  background-color: white;
}

.p-8 {
  padding: 2rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.max-w-md {
  max-width: 28rem;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.top-4 {
  top: 1rem;
}

.right-4 {
  right: 1rem;
}

.text-gray-400 {
  color: rgba(156, 163, 175, 1);
}

.hover\:text-gray-800:hover {
  color: rgba(31, 41, 55, 1);
}
</style>
