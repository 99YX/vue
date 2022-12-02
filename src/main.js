//引入vue路径
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);
Vue.config.productionTip = false
//引入样式
import './assets/gloable.css'

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
