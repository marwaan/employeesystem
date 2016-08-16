var Vue = require("vueResource");
require("directives/time-format.js");

module.exports = Vue.extend({
    template: require("./main.html!text"),
    props:["id"],
    data: function(){
      return  {
          employee:[],
          Editing :false
      }
    },
    ready: function() {

        // GET /api/employee
        this.$http.get('employee').then(function(res){
         this.employee = res.data
        },function (err){

        });
    },
    methods:{
        save: function(i) {
            var Employee = this.employee[i];
            console.log("Employee: ",Employee);
            this.$http.put('employee/' + Employee.id ,Employee).then(function(res){
                this.Employee = res.data
                this.Editing =false
            }, function (err) {
            });
        },
        isEditing:function (add) {
            this.Editing = true;
        },
        deleted: function(i) {
            var Employee = this.employee[i];
            console.log("Employee: ",Employee);
            this.$http.delete('employee/' + Employee.id ,Employee).then(function(req ,res){
                this.Employee = req.data;
                this.Editing = false

            }, function (err) {
            });

        }

    }
});