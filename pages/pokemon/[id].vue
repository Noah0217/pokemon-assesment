<template>
  <div style="width: 600px; height: 360px; padding: 10px; border: 1px solid #ccc; border-radius: 25px; font-family: system-ui;" v-if="pokemon">
    <h1 style="font-family: system-ui; font-size: 35px;">{{ pokemon.name }}</h1>
    <p style="font-family: system-ui; font-size: 18px;">Height: {{ pokemon.height }}ft.</p>
    <p style="font-family: system-ui; font-size: 18px;">Weight: {{ pokemon.weight }}lbs.</p>
    <p style="font-family: system-ui; font-size: 18px;">Abilities: {{ formattedAbilities }}</p>
      <img :src="pokemon.imageUrl" alt="Pokemon Image" class="pokemon-image" />
      <div class="btn-container">
      <button style="cursor: pointer; width: 75px; height: 25px; border-radius: 7px; background: #FE5C5C; border-color: transparent; color: #FFF;" @click="goBack">Back</button>
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
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
const formattedAbilities = ref<string>(''); // Define formattedAbilities as a ref variable

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
      formattedAbilities.value = abilities.map((ability: Ability) => ability.ability.name).join(', '); // Assign formattedAbilities directly here

      pokemon.value = {
        name: data.name,
        height: data.height,
        weight: data.weight,
        abilities: abilities,
        imageUrl: data.sprites.front_default,
      };
      console.log('Formatted Abilities:', formattedAbilities.value);
      console.log('Pokemon Object:', pokemon.value);
    } else {
      console.error('Error fetching Pokémon data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
});

watch(() => pokemon.value?.abilities, (newAbilities) => {
  if (newAbilities) {
    formattedAbilities.value = newAbilities.map((ability: Ability) => ability.ability.name).join(', ');
  }
});
const goBack = () => {
  const router = useRouter();
  router.go(-1);
};
</script>

<style scoped>
.btn-container {
  display: flex;
  justify-content: flex-end; /* Align items to the right */
  margin-top: auto; /* Push the container to the bottom */
  margin-right: 10px; /* Add some margin for spacing */
}

</style>