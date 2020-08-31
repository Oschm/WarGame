import AxiosService from '../libs/axios';

export default {
  data: function () {
    return {
      userName: '',
      password: '',
    };
  },
  methods: {
    onSubmit: function () {
      const body = {
        userName: this.userName,
        password: this.password,
      };
      console.log(JSON.stringify(body));
      AxiosService.post('login', body, this.loginSuccessfull, this.loginFailed);
      // AxiosService.get('login', this.loginSuccessfull, this.loginFailed);
    },
    loginSuccessfull: function () {
      this.$router.push('Overview');
    },
    loginFailed: function (error) {
      alert(error);
    },
  },
};
