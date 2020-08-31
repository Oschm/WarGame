import Vue from 'vue';
import Vuetify from 'vuetify/lib';

console.log(`Vuetify: ${Vuetify}`);
Vue.use(Vuetify);

export default new Vuetify({
  defaultAssets: {
    font: true,
    icons: 'mdi',
  },
  icons: {
    iconfont: 'mdi',
  },
});
