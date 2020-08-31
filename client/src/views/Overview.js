import HeaderComp from '../components/HeaderComp';
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
    },
  }),
  components: {
    HeaderComp,
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
      AxiosService.get('user', this.getUserDataSuccess, this.getUserDataSuccess);
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
