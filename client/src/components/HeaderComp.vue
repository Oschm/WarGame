<template>
  <div class="header">
    <h1>Welcome Back, {{ userData.firstName }} {{ userData.lastName }}!</h1>
    <h2>
      {{userData.wins > 0 && userData.losses > 0 ? 'Win/Loss Ratio: ' + userData.wins + '/' + userData.losses : 'No games playes yet.'}}
    </h2>
  </div>
</template>
<script>
  // import HeaderComp from './/HeaderComp';

  export default {
    props: {
      userData: Object,
    },
    render: (h) => h(HeaderComp),
  };

</script>
