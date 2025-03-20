<script setup lang="ts">
import { ref, computed } from "vue";

const tapeName = ref("");
const actualMinutes = ref(0);
const skipSeconds = ref(0);

const props = defineProps({
  aSide: Array,
  bSide: Array,
  removeFromASide: Function,
  removeFromBSide: Function
});

const actualSideTimeMs = computed(() => actualMinutes.value * 60000);
const skipTimeMs = computed(() => skipSeconds.value * 1000);

// Compute total duration for A-side
const totalASideDuration = computed(() => {
  return props.aSide.reduce((total, song) => total + song.duration_ms, 0);
});

// Compute total duration for B-side
const totalBSideDuration = computed(() => {
  return props.bSide.reduce((total, song) => total + song.duration_ms, 0);
});

// Convert ms to min:sec format
const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}m ${seconds}sec`;
};
</script>

<template>
  <div class="cassette">
    <div id="cassetteInformation">
      <div class="informationInputWrapper">
        <label for="tapeName">Tape name:</label>
        <input id="tapeName" v-model="tapeName" placeholder="Epic mixtape" />
      </div>
      <div class="informationInputWrapper">
        <label for="actualSideTime">Minutes per side:</label>
        <input id="actualMinutes" v-model.number="actualMinutes" type="number" min="0" placeholder="min" />
        <p>Time in ms: {{ actualSideTimeMs }} ms</p>
      </div>

      <div class="informationInputWrapper">
        <label for="skipTime">Pause seconds between songs:</label>
        <input id="skipSeconds" v-model.number="skipSeconds" type="number" min="0" max="59" placeholder="sec" />
        <p>Skip Time in ms: {{ skipTimeMs }} ms</p>
      </div>
    </div>

    <div class="sides">
      <div class="side">
        <h3>A-Side</h3>
        <p>Total Duration: {{ formatDuration(totalASideDuration) }}</p>
        <ul>
          <li v-for="(song, index) in props.aSide" :key="index">
            {{ song.name }} by {{ song.artists[0].name }}
            <button @click="props.removeFromASide(song.id)">Remove</button>
          </li>
        </ul>
      </div>
      <div class="side">
        <h3>B-Side</h3>
        <p>Total Duration: {{ formatDuration(totalBSideDuration) }}</p>
        <ul>
          <li v-for="(song, index) in props.bSide" :key="index">
            {{ song.name }} by {{ song.artists[0].name }}
            <button @click="props.removeFromBSide(song.id)">Remove</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cassette {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.sides {
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 65%;
}

.side {
  width: 100%;
}

h3 {
  margin-bottom: 10px;
}

button {
  margin-left: 10px;
  padding: 5px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: darkred;
}

#cassetteInformation {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 15px;
  border: 2px solid #1DB954;
  width: 35%;
}

.informationInputWrapper {
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: left;
}

.informationInputWrapper input{
  padding: 5px;
  border-radius: 500px;
  border: 2px solid #1DB954;
  width: 100%;
}
</style>
