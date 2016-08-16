var Vue = require("vueResource");
require("directives/time-format.js");

module.exports = Vue.extend({
    template: require("./main.html!text"),
    props:["id"],
    data: function(){
      return  {
          Payoff:[],
          Editing :false
      }
    },
    ready: function() {
        //var path = location.pathname.split("/");, + path[path.length-1]{id: 0, User: {} }
        // GET /payoff/id
        this.$http.get('payoff').then(function(res){
         this.Payoff = res.data
        },function (err){

        });
    },
    methods:{
        save: function(i) {
            var payoff = this.Payoff[i];
            this.$http.put('payoff/' + payoff.id ,payoff).then(function(res){
                this.payoff = res.data
                this.Editing =false
            }, function (err) {
            });
        },
        isEditing:function (add) {
            this.Editing = true;
        },
        deleted: function(i) {
            var payoff = this.Payoff[i];
            this.$http.delete('payoff/' + payoff.id ,payoff).then(function(req ,res){
                this.payoff = req.data;
                this.Editing = false

            }, function (err) {
            });

        }

    }
});