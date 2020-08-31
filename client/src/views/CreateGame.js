import HeaderComp from '../components/HeaderComp';
import AxiosService from '../libs/axios';

export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    errorState: false,
    selectedUser: null,
    userData: null,
    opponents: [{
        firstName: 'Nazar',
        lastName: 'Kulyk',
        id: '1',
      },
      {
        firstName: 'Patrick',
        lastName: 'Schmidt',
        id: '2',
      },
    ],
  }),

  components: {
    HeaderComp,
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    console.log('loading');
    this.userData = this.$route.params.userData;
    this.loadOpponents();
  },

  methods: {
    loadOpponents() {
       console.log();
       AxiosService.get('user/opponents', this.getUserDataSuccess, this.getUserDataFail);
    },
    getUserDataSuccess(response) {
      this.opponents = response.data;
    },
    getUserDataFail(error) {
      alert(error.message);
    },
    onClick(route) {
      this.$router.push(route);
    },
    formatter(item) {
      console.log('item');
      return `${item.firstName} ${item.lastName}`;
    },
    createGame() {
      // get selected User
      if (!this.selectedUser) {
        this.errorState = true;
        return;
      }
      debugger;
    },
    resetErrorState() {
      this.errorState = false;
    },
  },
};
