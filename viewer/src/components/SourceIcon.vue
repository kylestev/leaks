<template>
  <v-img
    :src="imgSrc"
    contain
    width="32"
  ></v-img>
</template>

<script>
export default {
  props: {
    sourceName: String
  },

  data() {
    return {
      imgSrc: require(`../logos/${this.sourceName}.png`)
    }
  }
}
</script>
