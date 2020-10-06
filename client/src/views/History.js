import HeaderComp from '../components/HeaderComp';
import NavigationDrawer from '../components/NavigationDrawer';
import AxiosService from '../libs/axios';

export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: true,
    userData: {
      firstName: '',
      lastName: '',
      wins: 0,
      losses: 12,
      games: [{
          _id: '5f4e1a58a515f95658e3e779',
          user2: '5f45197213143034e047d187',
          playerHealth: 3,
          startedTime: '2020-09-01T09:54:32.077Z',
          invitationPending: true,
          gameOver: false,
          winner: null,
          user1: '5f4e1a35a515f95658e3e778',
        },
        {
          _id: '5f4e1a5fa515f95658e3e77b',
          user2: '5f4549183932944e7c403ef5',
          playerHealth: 3,
          startedTime: '2020-09-01T09:54:39.097Z',
          invitationPending: true,
          gameOver: false,
          winner: null,
          user1: '5f4e1a35a515f95658e3e778',
        },
        {
          _id: '5f4e278ea515f95658e3e77d',
          user2: '5f45197213143034e047d187',
          playerHealth: 3,
          startedTime: '2020-09-01T10:50:54.556Z',
          invitationPending: true,
          gameOver: false,
          winner: null,
          user1: '5f4e1a35a515f95658e3e778',
        },
      ],
    },
    headers: [{
        text: 'Opponent',
        align: 'start',
        sortable: false,
        value: 'opponent.name',
      },
      {
        text: 'Winner',
        value: 'winner.name',
      },
      {
        text: 'GameOver',
        value: 'gameOver',
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
    this.userData.wins = 12;
    this.userData.losses = 5;
    this.loadGameHistoryData();
  },

  methods: {
    loadGameHistoryData() {
      // console log loading gameData
      AxiosService.get('api/game/history', this.getGameDataSuccess, this.getGameDataFail);
    },
    getGameDataSuccess(response) {
      Object.assign(this.userData, response.data);
      this.userData.wins = response.data.wins;
      this.userData.losses = response.data.losses;
    },
    getGameDataFail(error) {
      alert(error.message);
    },
    onClick(route) {
      this.$router.push({
        name: route,
        params: {
          userData: this.userData,
        },
      });
    },
  },
};
