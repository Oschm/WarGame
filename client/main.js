

var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Test!'
    }
  })

  var app2 = new Vue({
    el: '#app-2',
    data: {
      message: 'You loaded this page on ' + new Date().toLocaleString()
    },
    methods: {
        changeMessage: function () {
            this.message = 'You loaded this page on ' + new Date().toLocaleString();
        }
    }
  })


  var app4 = new Vue({
    el: '#app-4',
    data: {
      todos: [
        { text: 'Learn JavaScript' },
        { text: 'Learn Vue' },
        { text: 'Build something awesome' }
      ]
    }
  })


  Vue.component('header-comp', {
    "props": {"user": Object},
    template: `<div class="header"><h1>Welcome Back {{ user.firstName }} {{ user.lastName }}</h1>
    <h3>{{ (user.wins > 0 && user.losses > 0) ? 'Win/Loss Ratio: ' + user.wins + '/' + user.losses :  'No games playes yet.'}}</h3></div>`
      })


      //
      /*
       <div class="header">
        <h3>Welcome Back {{ userData.firstName }} {{ userData.lastName }}</h3>
        <h2>{{userData.wins > 0 && userData.losses > 0 : 'Win/Loss Ratio' userData.wins + '/' + userData.losses : ? 'No games playes yet.'}}</h2>
      </div>*/

  var header = new Vue({
    el: '#app-5',
    data: {
        "user": {
            firstName: 'Oliver',
            lastName: 'Schmidt',
            wins: 0,
            losses: 0
        }
    }
  })

  Vue.component('todo-item', {
      "props": ["name", "ob"],
    template: '<div><h3>Hello {{ name }} und {{ ob.propertyName }} <h3></div>'
  })

  new Vue({
    el: '#app-6',
    data: {
      message: 'Hello Vue.js!',

      "ob": {
            propertyName: "Property"
      }
    }
  })
