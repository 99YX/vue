//引入vue路径
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
//引入样式
import './assets/gloable.css';
import store from "@/store";

Vue.use(ElementUI);
Vue.config.productionTip = false
import request from "@/utils/request.js";

Vue.prototype.request=request()
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
