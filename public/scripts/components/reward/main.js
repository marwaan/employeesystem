var Vue = require("vueResource");
require("directives/time-format.js");

module.exports = Vue.extend({
    template: require("./main.html!text"),
    props:["ID"],
    data: function(){
      return  {
          reward:[],
          Editing :false
      }
    },
    ready: function() {

        // GET /reward
        this.$http.get('reward').then(function(res){
         this.reward = res.data
        },function (err){

        });
    },
    methods:{
        save: function(i) {
            var Reward = this.reward[i];
            console.log("Reward: ",Reward);
            this.$http.put('reward/' + Reward.ID ,Reward).then(function(res){
                this.Reward = res.data
                this.Editing =false
            }, function (err) {
            });
        },
        isEditing:function (add) {
            this.Editing = true;
        },
        deleted: function(i) {
            var Reward = this.reward[i];
            console.log("Reward: ",Reward);
            this.$http.delete('reward/' + Reward.ID ,Reward).then(function(req ,res){
                this.Reward = req.data;
                this.Editing = false

            }, function (err) {
            });

        }

    }
});