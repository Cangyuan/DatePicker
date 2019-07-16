/*eslint-disable*/
import DatePicker from './components/DatePicker.vue';
import iView from 'iview';
import locale from 'iview/dist/locale/en-US';
import vueTouch from 'kim-vue-touch';
Vue.use(iView, { locale });
Vue.use(vueTouch)
import './style.scss';

new Vue({
  el: '#app',
  data() {
    return {
      date: '2019-07-13',
      minDate: '2000-09-11',
      maxDate: '2020-09-11',
      showDatePicker: true,
      selectedDate: '点击选择日期',
    };
  },
  methods: {
    openDatePicker() {
      this.showDatePicker = true;
    },
    confirm(value) {
      this.showDatePicker = false;
      this.selectedDate = value;
    },
    cancel() {
      this.showDatePicker = false;
    },
  },
  components: {
    DatePicker,
  },
});
