import HeaderComp from '../components/HeaderComp';
import NavigationDrawer from '../components/NavigationDrawer';
// import AxiosService from '../libs/axios';

export default {
  props: {
    id: String,
  },
  data: () => ({

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
