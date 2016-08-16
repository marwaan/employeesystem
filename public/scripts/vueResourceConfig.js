var Vue = require("vue");
var vueResource = require("vue-resource.js");

Vue.use(vueResource);

Vue.http.options.root = 'http://localhost:9000/api';
Vue.http.headers.common = {
    token: user.token
};

module.exports = Vue;