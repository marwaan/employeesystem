System.import("vue").then(function (Vue){
    System.import("components/payoff").then(function (Payoffcomponent){
        var demo = new Vue({
            el: '#demo',
            components:{
                Payoff:Payoffcomponent
            }
        })
    });
})