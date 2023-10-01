<template>
  <div v-if="pokemon">
    <h1>{{ pokemon.name }}</h1>
    <p>Height: {{ pokemon.height }}</p>
    <p>Weight: {{ pokemon.weight }}</p>
    <p>Abilities: {{ formattedAbilities }}</p>
    <img :src="pokemon.imageUrl" alt="Pokemon Image" class="pokemon-image" />
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  abilities: Ability[];
  imageUrl: string;
}

const pokemon = ref<Pokemon | null>(null);

onMounted(async () => {
  const route = useRoute();
  const pokemonId = route.params.id;

  if (!pokemonId) {
    console.error('Pokemon ID is undefined');
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    if (response.ok) {
      const data = await response.json();

      const abilities: Ability[] = data.abilities;
      const formattedAbilities = abilities.map((ability: Ability) => ability.ability.name).join(', ');

      pokemon.value = {
        name: data.name,
        height: data.height,
        weight: data.weight,
        abilities: abilities,
        imageUrl: data.sprites.front_default,
      };
    } else {
      console.error('Error fetching Pokémon data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
});

const formattedAbilities = ref<string>('');
if (pokemon.value) {
  formattedAbilities.value = pokemon.value.abilities.map((ability: Ability) => ability.ability.name).join(', ');
}
</script>

<style scoped>
.pokemon-image {
  width: 200px;
  height: 200px;
}
</style>







<!-- <template>
  <div>
    <h1>{{ pokemon.name }}</h1>
    <p>Height: {{ pokemon.height }}</p>
    <p>Weight: {{ pokemon.weight }}</p>
    <p>Abilities: {{ formattedAbilities }}</p>
    <img :src="pokemon.imageUrl" alt="Pokemon Image" class="pokemon-image" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

interface Ability {
ability: {
  name: string;
  url: string;
};
is_hidden: boolean;
slot: number;
}

interface Pokemon {
name: string;
id: number;
imageUrl: string;
}

const pokemon = ref<any>({});
const formattedAbilities = ref<string>('');

onMounted(async () => {
const route = useRoute();
const pokemonId = route.params.id;

if (!pokemonId) {
  console.error('Pokemon ID is undefined');
  return;
}

console.log('Pokemon ID:', pokemonId);

try {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  if (response.ok) {
    const data = await response.json();
    console.log('Pokemon Data:', data);

    // Update the state variables with fetched data
    // ...
  } else {
    console.error('Error fetching Pokémon data:', response.statusText);
  }
} catch (error) {
  console.error('Error fetching Pokémon data:', error);
}
});
</script> -->
