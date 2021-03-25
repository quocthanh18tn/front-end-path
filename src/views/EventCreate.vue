<template>
  <div>
    <h1>Create event</h1>
    <!-- <p>This is created by {{ user.id }}</p> -->
    <!-- <p>There are {{ catLength }} categories</p> -->
    <!-- <p>{{ getEventById(3) }}</p> -->
    <!-- <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    getEvent() {
      return this.$store.getters.getEventById;
    },
    catLength() {
      return this.$store.getters.catLength;
    },
    ...mapGetters(["getEventById"]),
    ...mapState(["user", "categories"]),
  },
};
</script>

<style lang="scss" scoped></style>
