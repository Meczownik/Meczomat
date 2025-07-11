$(document).ready(function(){
    $(".info-box").hide();

    // Tablica z parami: [przycisk, box do pokazania]
    const pairs = [
        ["#mazowieckie", "#info-mazowieckie"],

        //Pomorskie

        ["#pomorskie", "#info-pomorskie"],
        ["#a_gdansk", "#A-klasa_Gdansk"],
        ["a_malbork", "#A-klasa_Malbork"],
        ["#b_gdansk", "#B-klasa_Gdansk"],
        ["#b_malbork", "#B-klasa_Malbork"],

        //Małopolskie

        ["#malopolskie", "#info-malopolskie"],
        ["#a_wadowice", "#A-klasa_Wadowice"],
        ["#b_limanowa", "#B-klasa_Limanowa"],
        ["#b_wadowice", "#B-klasa_Wadowice"],

        //Dolnośląskie

        ["#dolnoslaskie", "#info-dolnoslaskie"],
        ["#a_wroclaw", "#A-klasa_Wroclaw"],
        ["#a_walbrzych", "#A-klasa_Walbrzych"],
        ["#a_legnica", "#A-klasa_Legnica"],
        ["#a_jelenia_gora", "#A-klasa_Jelenia_Gora"],
        ["#b_wroclaw", "#B-klasa_Wroclaw"],
        ["#b_walbrzych", "#B-klasa_Walbrzych"],
        ["#b_legnica", "#B-klasa_Legnica"],
        ["#b_jelenia_gora", "#B-klasa_Jelenia_Gora"]
    ];

    pairs.forEach(([btn, box]) => {
        $(btn).click(function(e){
            e.stopPropagation();
            $(box).slideToggle();
        });
    });
});
