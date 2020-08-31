import AxiosService from '../libs/axios';

export default {
  data: function () {
    return {
      passwordRules: [
        (value) => !!value || 'This Field is Required.',
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      formHasErrors: false,
      errorMessage: '',
      errorState: false,
      userName: null,
      password: null,
    };
  },
  computed: {
    form() {
      return {
        userName: this.userName,
        password: this.password,
      };
    },
  },
  methods: {
    onSubmit: function () {
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true;

        this.$refs[f].validate(true);
      });
      if (this.formHasErrors) {
        return;
      }
      const body = {
        userName: this.userName,
        password: this.password,
      };
      console.log(JSON.stringify(body));
      AxiosService.post('api/login', body, this.loginSuccessfull, this.loginFailed);
      // AxiosService.get('login', this.loginSuccessfull, this.loginFailed);
    },
    loginSuccessfull: function () {
      this.$router.push('Overview');
    },
    loginFailed: function (error) {
      this.errorState = true;
      this.errorMessage = error;
    },
  },
};
