<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { searchSpotify } from "@/api/spotify";
import { Song } from "@/types/Song";

const title = ref("");
const artist = ref("");
const results = ref<Song[]>([]);
const loading = ref(false);

// Define emits for adding to A-side and B-side
const emit = defineEmits(["add-to-a-side", "add-to-b-side"]);

// Function to handle search
const handleSearch = async () => {
  if (!title.value || !artist.value) return;

  loading.value = true;
  const response: Song[] = await searchSpotify(title.value, artist.value);
  console.log("Full API Response:", response); // Log full response

  results.value = response.map((track) => ({
    ...track,
    duration: `${Math.floor(track.duration_ms / 60000)}m ${Math.floor(
      (track.duration_ms % 60000) / 1000
    )}sec`,
  }));

  loading.value = false;
};
</script>

<template>
  <div class="search-container">
    <h2>Search for a Song</h2>
    <div class="input-group">
      <input v-model="title" type="text" placeholder="Song Title" />
      <input v-model="artist" type="text" placeholder="Artist Name" />
      <button class="addButton" @click="handleSearch" :disabled="loading">
        {{ loading ? "Searching..." : "Search" }}
      </button>
    </div>

    <div v-if="results.length">
      <h3>Results:</h3>
      <ul>
        <li v-for="track in results" :key="track.id">
          <img class="coverImage" :src="track.album.images[0]?.url || '/fallback-image.jpg'" alt="Album Art" />
          <div class="songData">
            <div class="songInfo">
                <p><strong>{{ track.name }}</strong> by {{ track.artists[0].name }}</p>
                <p>{{ track.duration }}</p>
            </div>
            <div class="addButtons">
                <button class="addButton" @click="emit('add-to-a-side', track)">Add to A-side</button>
                <button class="addButton" @click="emit('add-to-b-side', track)">Add to B-side</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

.search-container {
  max-width: 500px;
  margin: 20px 0;
  text-align: left;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.addButton {
  padding: 10px;
  background-color: #1DB954;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.addButton:disabled {
  background-color: gray;
  cursor: not-allowed;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.songData{
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.songInfo{
    text-align: start;
}

.coverImage {
  width: 100px;
  height: 100px;
  border-radius: 5px;
}

.addButtons{
    display: flex;
    flex-direction: column;
    gap: 5px;
}
</style>