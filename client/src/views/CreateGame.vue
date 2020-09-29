<template>
  <v-app id="createGame">
    <NavigationDrawer v-bind:drawer="drawer"></NavigationDrawer>
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <HeaderComp v-bind:userData="userData"> </HeaderComp>
      <v-divider></v-divider>
      <v-container>
        <v-row align="start" justify="start">
          <v-col cols="3" sm="4">
            <v-card class="mx-auto" outlined>
              <v-card-text class="text--primary">
                <v-alert v-if="errorState" type="error">
                  Please select a User.
                </v-alert>
                <div>
                  Start a Game with
                  <v-combobox
                    v-bind:error="errorState"
                    @change="resetErrorState"
                    v-model="selectedUser"
                    :items="opponents"
                    :item-text="formatter"
                    label="Select User to play a game with"
                    return-object
                  >
                  </v-combobox>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="createGame()">Create Game</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<script src="./CreateGame.js" />
