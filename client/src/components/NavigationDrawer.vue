<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list dense>
      <v-list-item link @click="onClick('Overview')">
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="onClick('CreateGame')">
        <v-list-item-action>
          <v-icon>mdi-sword-cross</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>New Game</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="onClick('History')">
        <v-list-item-action>
          <v-icon>mdi-history</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>History</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  render: (h) => h(NavigationDrawer),
      props: {
      drawer: Boolean,
      userData: Object,
    },
  methods: {
    onClick(route) {
      this.$router.push({
        name: route,
        params: {
          userData: this.userData,
        },
      });
    },
  },
};
</script>
