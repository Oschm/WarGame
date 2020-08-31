<template>
  <v-app id="overview">
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
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <HeaderComp v-bind:userData="userData"> </HeaderComp>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <v-data-table :headers="headers" :items="userData.games" class="elevation-1"></v-data-table>
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
