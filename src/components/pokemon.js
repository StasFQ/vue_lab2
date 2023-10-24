Vue.component('user-item', {
  props: ['pokemon'],
  template: `
    <div class="user-item">
        <div class="user-details">
            <img :src="getPokemonImage(pokemon.url)" :alt="pokemon.name" class="avatar">
            <div class="user-info">
                <h3>{{ pokemon.name }}</h3>
            </div>
        </div>
        <div class="user-actions">
            <button @click="deletePokemon(pokemon.name)">Delete</button>
        </div>
    </div>
  `,
  methods: {
    getPokemonImage(pokemonUrl) {
      const urlParts = pokemonUrl.split('/');
      const pokemonId = urlParts[urlParts.length - 2];
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    },
    deletePokemon(pokemonName) {
      this.$emit('delete', pokemonName);
    }
  }
});

new Vue({
  el: '#app',
  data: {
    searchText: '',
    pokemons: [],
  },
  computed: {
    filteredPokemons() {
      return this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
  methods: {
    async searchPokemon() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const data = await response.json();
        this.pokemons = data.results;
      } catch (error) {
        console.error('Помилка під час отримання даних покемонів', error);
      }
    },
    deletePokemon(pokemonName) {
      this.pokemons = this.pokemons.filter(pokemon => pokemon.name !== pokemonName);
    },
  },
  created() {
    this.searchPokemon();
  }
});
