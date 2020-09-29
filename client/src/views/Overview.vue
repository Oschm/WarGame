<template>
  <v-app id="overview">
    <NavigationDrawer v-bind:drawer="drawer"></NavigationDrawer>
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <HeaderComp v-bind:userData="userData"> </HeaderComp>
      <v-divider></v-divider>
      <v-container class="ma-2 pa-2" fluid>
        <h2>Current Games</h2>
        <v-row align="start" justify="start">
          <v-col class="text-center" cols="1" sm="10">
            <v-data-table
              disable-pagination="true"
              :headers="headers"
              :items="userData.games"
              class="elevation-1"
              @click:row="handleRowClick"
            >
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<script src="./Overview.js" />
