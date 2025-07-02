$(document).ready(function(){

    $(".info-box").hide();
    
    $("#mazowieckie").click(function(e){
        e.stopPropagation();
        $(".info-box").hide();
        $("#info-mazowieckie").toggle();
    });

    $("#pomorskie").click(function(e){
        e.stopPropagation();
        $(".info-box").hide();
        $("#info-pomorskie").toggle();
    });

    $("#malopolskie").click(function(e){
        e.stopPropagation();
        $(".info-box").hide();
        $("#info-malopolskie").toggle();
    });

    $(document).click(function(){
        $(".info-box").hide();
    });
});
