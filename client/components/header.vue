Vue.component('header', {
  props: ['userData'],
  template: `
    <div class="header">
      <h3>Welcome Back {{ userData.firstName }} {{ userData.lastName }}</h3>
      <h2>{{userData.wins > 0 && userData.losses > 0 : 'Win/Loss Ratio' userData.wins + '/' + userData.losses : ? 'No games playes yet.'}}</h2>
    </div>`
    })