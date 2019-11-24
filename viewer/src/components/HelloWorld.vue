<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex
        xs12
        mb-5
      >
        <h2 class="headline font-weight-bold mb-3">Leaks</h2>

        <v-layout justify-center>
          <a
            v-for="(leak, i) in leaks"
            :key="i"
            href="#"
            class="subheading mx-3"
            target="_blank"
          >
            {{ leak.leakId }}
          </a>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getLeaks } from '../api/Leaks';

export default {
  name: 'HelloWorld',

  data: () => ({
    leaks: [],
    loading: false,
    loaded: false,
    error: null
  }),

  methods: {
    async loadLeaks() {
      if (this.loading) return;
      this.loading = true;
      this.loaded = false;
      this.error = null;
      try {
        this.leaks = await getLeaks();
        this.loaded = true;
      } catch (error) {
        this.error = error.message;
      }
    }
  },

  async mounted() {
    if (!this.loaded) await this.loadLeaks();
  }
};
</script>
