<template>
  <div id="app">
    <v-card class="elevation-12 login-form">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Login form</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <span>Source</span>
        </v-tooltip>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field label="Login" name="login" prepend-icon="mdi-account" type="text"
            v-model="userName">
          </v-text-field>

          <v-text-field id="password" label="Password" name="password" prepend-icon="mdi-lock"
            type="password" v-model="password"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="onSubmit()">Login</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script src="./Login.js" />
