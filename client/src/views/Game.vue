<template>
  <v-app id="Game">
    <NavigationDrawer v-bind:drawer="drawer"></NavigationDrawer>
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <HeaderComp v-bind:userData="userData"> </HeaderComp>
      <v-divider></v-divider>
      <v-container class="ma-2 pa-2" fluid>
        <H1>Select Actions for this Round</H1>
        <v-form ref="form" v-model="valid" :lazy-validation="lazy">
          <v-row align="start" justify="start">
            <v-col class="text-left" cols="2" sm="2">
              <div>
                <H1>Attack</H1>
                <v-radio-group ref="defend" v-model="form.attack" :error="errorState.attack" :error-messages="errorMessage.attack" @change="resetError('attack')">
                  <v-radio
                    v-for="target in targets"
                    :key="target.id"
                    :label="target.label"
                    :value="target.id"
                  ></v-radio>
                </v-radio-group>
              </div>
            </v-col>
            <v-col class="text-left" cols="2" sm="2">
              <div>
                <H1>Defend</H1>
                <v-radio-group ref="attack" v-model="form.defend" :error="errorState.defend" :error-messages="errorMessage.defend" @change="resetError('defend')">
                  <v-radio
                    v-for="target in targets"
                    :key="target.id"
                    :label="target.label"
                    :value="target.id"
                  ></v-radio>
                </v-radio-group>
                <v-btn color="success" class="mr-4" @click="validate">
                  Fight!
                </v-btn>
              </div>
            </v-col>
            <v-col class="text-left" cols="2" sm="3"> </v-col>
          </v-row>
          <v-divider></v-divider>
          <H1>Passed Rounds</H1>
          <v-row>
            <v-data-table
              disable-pagination="true"
              :headers="oldRoundsHeaders"
              :items="oldRounds"
              class="elevation-1"
            >
            </v-data-table>
          </v-row>
        </v-form>
      </v-container>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<script src="./Game.js" />
