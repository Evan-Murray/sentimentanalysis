var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// arrays containing the tweets by category
var positives;
var negatives;
var neutrals;
// value that pushes the plot points and the center line over to make room for the number labels 
var spacing = 40;

function visualize() {
    clearCanvas();
    // the tweets are stored in session storage, so this function retrieves them
    getSessionValues();
    canvas.width = canvas.clientWidth+spacing;
    canvas.height = canvas.clientHeight+spacing;
    drawLabels();
    plotPositiveTweets();
    plotNegativeTweets();
    plotNeutralTweets();
    console.log(positives.length + negatives.length + neutrals.length);
    console.log("graph complete");
    $("#loading-gif").removeClass("visible");

    
}
function getSessionValues(){
    positives = JSON.parse(sessionStorage.positiveList);
    negatives = JSON.parse(sessionStorage.negativeList);
    neutrals = JSON.parse(sessionStorage.neutralList);
}
function getNeutralScale(){
    return 
}
function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function drawLabels(){
    //y axis labels
    ctx.fillStyle = "#444444"; // set color
    ctx.font = "normal normal 14px Helvetica";
    ctx.fillText("0", 20, (canvas.height/2)+3);
    ctx.fillText("1", 20, 15);
    ctx.fillText("-1", 20, canvas.height-5);
    ctx.font = "normal normal 11px Helvetica";
    ctx.fillText(".5", 20, canvas.height/4);
    ctx.fillText("-.5", 20, canvas.height * .75);
    ctx.save();
    ctx.translate( 0, 0 );
    ctx.rotate( Math.PI / 2 );
    ctx.font = "normal bold 16px Helvetica";
    ctx.fillText("Polarity", (canvas.height/2)-20, 0);
    ctx.restore();

    //graph line
    ctx.fillStyle="#000000";
    ctx.beginPath();
    ctx.moveTo(30,canvas.height/2);
    ctx.lineTo(canvas.width,canvas.height/2);
    ctx.stroke();
}
function plotPositiveTweets(){
    var padding = (canvas.width-spacing)/positives.length;
    //positive data plots
    for(var i = 0; i < positives.length; i++){
       // ctx.fillRect(s*i, (canvas.height/2) - (positives[i].polarity*10), 2, 2);
              ctx.beginPath();
              ctx.arc(((padding*i)+spacing), (canvas.height/2) - (positives[i].polarity*200), 5, 0, 2 * Math.PI, false);
              ctx.fillStyle = '#41f489';
              ctx.fill();
              ctx.lineWidth = 1;
              ctx.strokeStyle = '#003300';
              ctx.stroke();
    }
}
function plotNegativeTweets(){
    //negative data plots
    var padding = (canvas.width-spacing)/negatives.length;
    for(var i = 0; i < negatives.length; i++){
              ctx.beginPath();
              ctx.arc(((padding*i)+spacing), (canvas.height/2) + Math.abs((negatives[i].polarity*200)), 5, 0, 2 * Math.PI, false);
              ctx.fillStyle = '#f44242';
              ctx.fill();
              ctx.lineWidth = 1;
              ctx.strokeStyle = '#003300';
              ctx.stroke();
    }
}
function plotNeutralTweets(){
    var padding = (canvas.width-spacing)/neutrals.length;
    //neutral data plots
    var neutralYplacement;
    for(var i = 0; i < neutrals.length; i++){
              ctx.beginPath();
              
              if(neutrals[i].polarity < 0)
                neutralYplacement = (canvas.height/2) + Math.abs((neutrals[i].polarity*200));
              else if(neutrals[i].polarity > 0)
                neutralYplacement = (canvas.height/2) - (neutrals[i].polarity*200);
              else
                neutralYplacement = canvas.height/2;
              ctx.arc(((padding*i)+spacing), neutralYplacement, 5, 0, 2 * Math.PI, false);
              ctx.fillStyle = '#a5a5a5';
              ctx.fill();
              ctx.lineWidth = 1;
              ctx.strokeStyle = '#003300';
              ctx.stroke();
    }
}