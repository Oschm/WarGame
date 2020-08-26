var app = new Vue({
    el: '#app',
    data: {
        user: "",
        password: ""
    },
    methods: {
        "onSubmit": function () {
            console.log(this.user);
            console.log(this.password);
        }
    }
})