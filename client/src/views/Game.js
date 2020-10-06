import HeaderComp from '../components/HeaderComp';
import NavigationDrawer from '../components/NavigationDrawer';
import AxiosService from '../libs/axios';
import _ from '../libs/lodash';

export default {
  props: {
    id: String,
  },
  data: () => ({
    userData: null,
    gameId: null,
    errorState: {
      attack: false,
      error: false,
    },
    errorMessage: {
      attack: null,
      defend: null,
    },
    form: {
      attack: null,
      defend: null,
    },
    targets: [{
        id: 1,
        label: 'Head',
      },
      {
        id: 2,
        label: 'Torso',
      },
      {
        id: 3,
        label: 'Legs',
      },
    ],
    notEmpty: [
      (v) => !!v || 'Please chose a Value',
    ],
    drawer: true,
    oldRounds: [],
    oldRoundsHeaders: [{
        text: 'Round Number',
        align: 'start',
        value: 'roundNumber',
      },
      {
        text: 'User1 Attack',
        value: 'user1Attack',
      },
      {
        text: 'User1 Defend',
        value: 'user1Defend',
      },
      {
        text: 'User2 Attack',
        value: 'user2Attack',
      },
      {
        text: 'User1 Defend',
        value: 'user1Attack',
      },
    ],
  }),

  components: {
    HeaderComp,
    NavigationDrawer,
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    console.log('loading');
    this.userData = this.$route.params.userData;
    this.gameId = this.$route.params.id;
    this.loadGameData();
  },
  methods: {
    loadGameData: function () {
      AxiosService.get(`api/game/${this.gameId}`, this.getGameDataSuccess, this.getGameDataFail);
    },
    getGameDataSuccess: function (response) {
      const rounds = response.data.rounds;
      this.currentRound = response.data['currentRound'];
      this.oldRounds = _.take(rounds, this.currentRound - 1);
    },
    getGameDataFail: function (response) {
      console.log(response);
      alert('Error');
    },
    onClick(route) {
      this.$router.push({
        name: route,
        params: {
          userData: this.userData,
        },
      });
    },
    validate() {
      let hasErrors = false;
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) {
          hasErrors = true;
          this.errorState[f] = true;
          this.errorMessage[f] = 'Please choose a value.';
        } else {
          this.errorState[f] = false;
          this.errorMessage[f] = '';
        }
      });
      if (!hasErrors) {
        const body = {
          attack: this.form.attack,
          defend: this.form.defend,
        };
        AxiosService.post(`/api/game/${this.gameId}/round/${this.currentRound}`, body, this
          .playRoundSuccess, this.playRoundError);
      }
    },
    playRoundSuccess() {
      this.$router.push({
        name: 'Overview',
        params: {
          userData: this.userData,
        },
      });
    },
    playRoundError(response) {
      alert(JSON.stringify(response.data));
    },
    resetError(sourceId) {
      this.errorState[sourceId] = false;
      this.errorMessage[sourceId] = '';
    },
    resetErrors() {
      Object.keys(this.form).forEach((f) => {
        this.errorState[f] = false;
        this.errorMessage[f] = '';
      });
    },
  },
};
