System.import("vue").then(function (Vue){
    System.import("components/employee").then(function (Employeecomponent){
        var demo = new Vue({
            el: '#demo',
            components:{
                employee:Employeecomponent
            }
        })
    });
})