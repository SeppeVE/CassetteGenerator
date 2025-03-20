<script setup lang="ts">
import { ref } from "vue";
import SearchSpotify from "@/components/SearchSpotify.vue";
import Cassette from "@/components/Cassette.vue";
import { Song } from "@/types/Song"; // Import the Song type

// State: The A-side & B-side songs
const aSide = ref<Song[]>([]);
const bSide = ref<Song[]>([]);

// Function to add a song to A-side
const addToASide = (song: Song) => {
  if (!aSide.value.find((s) => s.id === song.id)) {
    aSide.value.push(song);
  }
};

// Function to add a song to B-side
const addToBSide = (song: Song) => {
  if (!bSide.value.find((s) => s.id === song.id)) {
    bSide.value.push(song);
  }
};

// Function to remove a song from A-side
const removeFromASide = (songId: string) => {
  aSide.value = aSide.value.filter((s) => s.id !== songId);
};

// Function to remove a song from B-side
const removeFromBSide = (songId: string) => {
  bSide.value = bSide.value.filter((s) => s.id !== songId);
};
</script>

<template>
  <div class="calculator">
      <Cassette 
        :aSide="aSide" 
        :bSide="bSide" 
        :removeFromASide="removeFromASide" 
        :removeFromBSide="removeFromBSide" 
      />
    <SearchSpotify @add-to-a-side="addToASide" @add-to-b-side="addToBSide" />
  </div>
</template>

<style scoped>
.calculator {
    width: 75%;
    margin: auto;
}
</style>