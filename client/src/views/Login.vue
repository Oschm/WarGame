<template>
  <div id="app">
    <v-card class="elevation-12 login-form" ref="form">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Login form</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <span>Source</span>
        </v-tooltip>
      </v-toolbar>
      <v-card-text>
        <v-alert v-if="errorState" type="error" >
          {{errorMessage}}
        </v-alert>
        <v-form>
          <v-text-field
            ref="userName"
            label="Login"
            name="login"
            prepend-icon="mdi-account"
            type="email"
            v-model="userName"
            :rules="emailRules"
            :error-messages="errorMessages"
            required
          >
          </v-text-field>

          <v-text-field
            ref="password"
            label="Password"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
            v-model="password"
            :rules="passwordRules"
            :error-messages="errorMessages"
            required
          ></v-text-field>
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
