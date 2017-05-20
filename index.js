var api_key = 'trnsl.1.1.20170520T182148Z.048535fe1d474198.7ff844cf8520237fccf255d699f81778ce0a1715';

function translate(lang, text, callback) {
    $.ajax({
        url: "https://translate.yandex.net/api/v1.5/tr.json/translate?lang=" + lang + "&key=" + api_key + "&text="+ text,
        method: "GET",
        dataType: "json",
        success: function(data) {
            console.log("sdf");
            callback(data);
        },
        error: function(error) {
            console.log("How did this fail");
        }
    });
}
