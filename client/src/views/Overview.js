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
      games: [],
    },
    headers: [{
        text: 'Opponent',
        align: 'start',
        sortable: false,
        value: 'opponent.name',
      },
      {
        text: 'Current Round',
        value: 'currentRound',
      },
      {
        text: 'Your Turn',
        value: 'isUsersTurn',
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
    this.loadUserData();
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
    handleRowClick(item) {
      console.log('handleRowClick');
      const gameId = item.id;
      this.$router.push(`Game/${gameId}`);
    },
  },
};
