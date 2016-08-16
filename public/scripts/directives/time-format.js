var Vue = require("vue");
var Moment = require("moment");
Vue.directive('time-format', function (Value) {
    console.log(Value)
    this.el.textContent = Moment(Value).fromNow();

})