System.import("vue").then(function (Vue){
    System.import("components/reward").then(function (Rewardcomponent){
        var demo = new Vue({
            el: '#demo',
            components:{
                reward:Rewardcomponent
            }
        })
    });
})