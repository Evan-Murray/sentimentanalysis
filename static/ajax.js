$(document).ready(function()
{
    window.scrollTo(0,0);
    $("#submit").click(function()
    {
        clearCanvas();
        $("#error").removeClass("visible");
        $("#loading-gif").addClass("visible");
        $.ajax(
        {
            data : $('form').serialize(),
            type : 'POST',
            url : '/process'
        })
        .done(function(data){
            if(data.error){
                $("#loading-gif").removeClass("visible");
                $("#error").addClass("visible");
                $("#error").text(data.error)
            }else{
                $("#loading-gif").addClass("visible");
                var positives = [];
                var negatives = [];
                var neutrals = [];
               data.forEach(function(item){
                    if(item.polarity >= .1){
                        positives.push(item);
                    }
                    else if(item.polarity <= -.1){
                        negatives.push(item);
                    }else{
                        neutrals.push(item);
                    }
                });
                console.log(positives);
                console.log(negatives);
                console.log(neutrals);
                sessionStorage.positiveList = JSON.stringify(positives);
                sessionStorage.negativeList = JSON.stringify(negatives);
                sessionStorage.neutralList = JSON.stringify(neutrals);
                $("#loading-gif").removeClass("visible");
                visualize();

            }
        });
        
        event.preventDefault();
    });
});