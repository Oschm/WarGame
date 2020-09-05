import HeaderComp from '../components/HeaderComp';
import NavigationDrawer from '../components/NavigationDrawer';
import AxiosService from '../libs/axios';

export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
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
        value: 'user2',
      },
      {
        text: 'Winner',
        value: 'Winner',
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
    // this.loadUserData();
  },

  methods: {
    loadUserData() {
      // console log loading userData
      AxiosService.get('api/user', this.getUserDataSuccess, this.getUserDataSuccess);
    },
    getUserDataSuccess(response) {
      this.userData = response.data;
    },
    getUserDataFail(error) {
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
