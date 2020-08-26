<template>

    <body>
        <div id="app">

            <body>
                <div class="login-form">
                    <h2>Ibsolution Game</h2>
                    <form>
                        <div class="container">
                            <label for="name"><b>Username</b></label>
                            <input name="name" v-model="user"></input>
                        </div>
                        <div class="container">
                            <label for="password"><b>Password</b></label>
                            <input name="password" v-model="password"></input>
                        </div>
                        <button v-on:click="onSubmit">Login</button>
                    </form>
                </div>
            </body>
        </div>
        <script type="text/javascript" src="login.js"></script>
        <link rel="stylesheet" type="text/css" href="../styles/login.css">
    </body>
</template>