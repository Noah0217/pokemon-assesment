<template>
  <div>
    <div v-if="pokemons.length > 0">
      <div class="header">
        <div style="align-self: flex-start; font-family: system-ui;">{{ pokemons.length }} Pokémon fetched</div>
      <input v-model="searchText" class="search-input" placeholder="Search Pokémon..." />
    </div>
    <div class="pokemon-grid">
  <div v-for="pokemon in pokemons" :key="pokemon.id" class="pokemon-card" @click="navigateToProfile(pokemon.id)">
    <div class="pokemon-name">{{ pokemon.name }}</div>
    <img :src="pokemon.imageUrl" alt="Pokemon Image" class="pokemon-image" />
  </div>
</div>
    </div>
    <div style="font-size: 32px; font-family: system-ui; background: -webkit-linear-gradient(#ce1b1b, #d3d00f); -webkit-background-clip: text; -webkit-text-fill-color: transparent;" v-else>
    Loading...
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Pokemon {
  name: string;
  id: number;
  imageUrl: string;
}

export default defineComponent({
  name: 'App',
  data() {
    return {
      pokemons: [] as Pokemon[],
      searchText: '',
    };
  },
  created() {
    this.fetchPokemons();
  },
  methods: {
    async fetchPokemons() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=63');
    if (response.ok) {
      const data = await response.json();
      const pokemonsData = await Promise.all(
        data.results.map(async (pokemon: { name: string, url: string }) => {
          const response = await fetch(pokemon.url);
          if (response.ok) {
            const pokemonData = await response.json();
            return {
              name: pokemon.name,
              id: pokemonData.id,
              imageUrl: pokemonData.sprites.front_default, // Use the front_default sprite as the image URL
            };
          } else {
            throw new Error('Error fetching Pokémon details');
          }
        })
      );
      this.pokemons = pokemonsData;
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
},
navigateToProfile(pokemonId: number) {
      this.$router.push(`/pokemon/${pokemonId}`);
    },
  },
});
</script>

<style scoped>
.pokemon-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.pokemon-card {
  width: 200px;
  height: 300px;
  padding: 20px;
  margin: 5px;
  border: 1px solid #ccc;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
}
.pokemon-card:hover {
  border: 1px solid #9b9b9b;
}
.pokemon-name {
  font-weight: bold;
  font-size: 21px;
  margin-bottom: 10px;
}

.pokemon-image {
  width: 125px; /* Adjust the width of the image as needed */
  height: 125px; /* Adjust the height of the image as needed */
}

.header {
  background-color: #333;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 300px;
  font-size: 16px;
}
</style>
