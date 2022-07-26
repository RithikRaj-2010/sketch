function setup(){
    canvas=createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}
function clear_canvas(){
    background("white");
}
function preload(){
    classifier=ml5.imageClassifier("DoodleNet");
}
function classifyCanvas(){
    classifier.classify(canvas,gotresult);
}
function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}
function gotresult(error,result){
if(error){
    console.error(error);
}
else{
    console.log(result);
    document.getElementById("score").innerHTML= 'Score: '+result[0].score;
    document.getElementById("timer").innerHTML= 'Timer: '+Math.round(result[0].timer);
    utterthis=new SpeechSynthesisUtterance(result[0].label);
    synth.speak(utterthis);
}
}