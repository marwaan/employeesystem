var Vue = require("vueResource");
require("directives/time-format.js");

module.exports = Vue.extend({
    template: require("./main.html!text"),
    props:["ID"],
    data: function(){
      return  {
          activity:[],
          Editing :false
      }
    },
    ready: function() {

        // GET /activity
        this.$http.get('activity').then(function(res){
         this.activity = res.data
        },function (err){

        });
    },
    methods:{
        save: function(i) {
            var Activity = this.activity[i];
            console.log("activity: ",Activity);
            this.$http.put('activity/' + Activity.ID, Activity).then(function(res){
                this.Activity = res.data
                this.Editing =false
            }, function (err) {
            });
        },
        isEditing:function (add) {
            this.Editing = true;
        },
        deleted: function(i) {
            var Employee = this.activity[i];
            this.$http.delete('activity/' + Activity.ID ,Activity).then(function(req ,res){
                this.Activity = req.data;
                this.Editing = false

            }, function (err) {
            });

        }

    }
});