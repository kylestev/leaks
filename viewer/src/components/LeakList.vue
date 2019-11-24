<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Leak List
      </v-card-title>
      <v-data-table
        :sort-by="['leakId']"
        :headers="headers"
        :items="items"
      >
        <template v-slot:item.meta.postedAt="{ item }">
          <span v-if="item.meta.postedAt">{{ item.meta.postedAt.toFormat('DDD') }}</span>
          <em v-else>Unavailable</em>
        </template>
        <template v-slot:item.actions="{ item }">
          <router-link :to="`/leaks/${item.leakId}`" style="text-decoration: none">
            <v-icon class="mr-2">
              mdi-magnify
            </v-icon>
          </router-link>
        </template>
        <template v-slot:item.sourceTypes="{ item }">
          <em v-if="item.sourceTypes.length === 0">Unavailable</em>
          <v-row v-else>
            <v-avatar
              style="margin: 0 0.25rem"
              v-for="source in item.sourceTypes"
              :key="source"
              size="24"
            >
              <source-icon
                :source-name="source"
              ></source-icon>
            </v-avatar>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { Leaks } from '../api/Leaks';
import SourceIcon from './SourceIcon';

export default {
  components: {
    SourceIcon
  },
  data() {
    return {
      headers: [
        { text: 'ID', value: 'leakId' },
        { text: 'Number of Files', value: 'numFiles' },
        { text: 'Posted At', value: 'meta.postedAt' },
        { text: 'Sources', value: 'sourceTypes' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      leaks: Leaks.leaks
    };
  },

  computed: {
    items() {
      return this.leaks;
    }
  },

  methods: {
    goToLeak({ leakId }) {
      this.$router.push({ path: `/leaks/${leakId}` });
    }
  },
  // async mounted() {
  //   this.leaks = await getLeaks();
  // }
}
</script>
