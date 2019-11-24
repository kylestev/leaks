<template>
  <v-container fluid v-if="leak">
    <v-btn :disabled="previousLeakId === null" @click="goToLeak(previousLeakId)">Previous</v-btn>
    <v-btn :disabled="nextLeakId === null" @click="goToLeak(nextLeakId)">Next</v-btn>
    <h2>{{ primarySource }}</h2>
    <v-row>
      <v-col cols="1" v-for="iconType in sourceIconTypes" :key="iconType">
        <source-icon :source-name="iconType"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2"
        v-for="img in leak.media.images"
        :key="img.matched"
      >
        <a :href="repoAsset(img.matched)" rel="nofollow noreferrer">
          <v-img
            :src="repoAsset(img.matched)"
          ></v-img>
        </a>
      </v-col>
    </v-row>
    <v-alert
      outlined
      color="white"
      v-for="(section, index) in sections"
      :key="index"
    >
      <div>
        <p v-for="line in section" :key="line">
          {{ line }}
        </p>
      </div>
    </v-alert>
  </v-container>
</template>

<script>
import { getLeaks } from '../api/Leaks';
import { getSearchIndex } from '../api/Search';
import SourceIcon from './SourceIcon';
import { DateTime } from 'luxon';

window.DateTime = DateTime;

export default {
  props: {
    leakId: Number
  },

  components: { SourceIcon },

  data() {
    return {
      leaks: getLeaks()
    };
  },

  computed: {
    postedAt() {
      const { postedAt } = this.leak.meta;
      if (!postedAt) return null;
      const dt = DateTime.fromISO(postedAt);

      return dt.toFormat('DDDD');
    },
    leak() {
      return this.leaks.find(x => x.leakId == this.leakId);
    },
    nextLeakId() {
      if (this.leakId + 1 >= this.numLeaks) return null;
      return this.leakId + 1;
    },
    previousLeakId() {
      if (this.leakId - 1 < 0) return null;
      return this.leakId - 1;
    },
    sourceIconTypes() {
      return this.leak.sourceTypes.map(x => {
        if (x === 'Twitter') {
          return 'twitter.png';
        } else if (x === 'OSRS Wiki') {
          return 'wiki.png';
        } else if (x === 'Official News') {
          return 'rs.png';
        } else if (x === 'Reddit') {
          return 'reddit.png';
        } else if (x === 'YouTube') {
          return 'youtube.png';
        }
      })
    },
    sections() {
      const { text } = this.leak;
      if (!text) return [];

      const sections = [];
      let currentSection = [];
      for (const line of text) {
        if (line === '') continue;
        if (line === '---') {
          if (currentSection.length > 0) {
            sections.push(currentSection);//
            currentSection = [];
          }
        } else {
          currentSection.push(line);
        }
      }
      if (currentSection.length > 0) {
        sections.push(currentSection);
      }
      return sections;
    },
    primarySource() {
      const { source } = this.leak;
      if (source.news) return 'OSRS News Post';
      if (source.wiki) return 'OSRS Wiki';
      if (source.youtube) return 'YouTube';
      if (source.redditComment) return 'Reddit';
      if (source.tweet) return 'Twitter';
      return null;
    }
  },

  methods: {
    repoAsset(assetName) {
      return `https://raw.githubusercontent.com/RuneStar/leaks/master/${assetName}`
    },
    goToLeak(leakId) {
      this.$router.push({ path: `/leaks/${leakId}` })
    }
  },

  // methods: {
  //   loadLeaks() {
  //     // this.loaded = false;
  //     // this.loading = true;
  //     // this.leak = null;
  //     try {
  //       // this.leaks = getLeaks();
  //       this.numLeaks = Math.max(this.leaks.map(x => x.leakId));
  //       this.leak = this.leaks.find(x => x.leakId === this.leakId);
  //       // this.loaded = true;
  //       // this.error = null;
  //     } catch (error) {
  //       this.error = error.message;
  //       this.loaded = false;
  //     }
  //     this.loading = false;
  //   },
  //   loadLeak(leakId) {
  //     if (this.leaks === null) {
  //       this.loadLeaks();
  //     }

  //     this.leak = {
  //       ...this.leak,
  //       ...this.leaks.find(x => x.leakId === leakId)
  //     };
  //   }
  // },

  async mounted() {
    // this.loadLeak(this.leakId);
    window.$search = getSearchIndex();
  },

  // watch: {
  //   leakId(x) {
  //     this.loadLeak(x);
  //   }
  // }
}
</script>
