<script setup lang="ts">
import { ref } from "vue";

// Define form data with reactive variables
const formData = ref({
  name: "",
  email: "",
});

// Handle form submission
const handleSubmit = () => {
  console.log("Form Submitted:", formData.value);
  alert(`Submitted:\nName: ${formData.value.name}\nEmail: ${formData.value.email}`);
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <label>
      <input v-model="formData.name" type="text" required />
    </label>

    <label>
      Email:
      <input v-model="formData.email" type="email" required />
    </label>

    <button type="submit">Submit</button>
  </form>
</template>

<style scoped>
.form-container {
  max-width: 300px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  padding: 10px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #369f75;
}
</style>
