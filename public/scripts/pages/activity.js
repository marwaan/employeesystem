System.import("vue").then(function (Vue){
    System.import("components/activity").then(function (Activitycomponent){
        var demo = new Vue({
            el: '#demo',
            components:{
                activity:Activitycomponent
            }
        })
    });
})