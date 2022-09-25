const start = document.getElementById("start");
const stopButton=document.getElementById("stop");
var pause = document.getElementById('Pause');
var resume = document.getElementById('Resume');
let mediarecorder=null;
let chunks=[];
const a = document.getElementById("dow");
var blob;
var number=0;
var MyInterval;

navigator.mediaDevices.getDisplayMedia({video: true,DisplayCaptureSurfaceType:"browser"}).then(stream => {
      console.log("We have not a problem "+stream);
      const videoElem = document.getElementById("dene");
      start.disabled=false;
      videoElem.srcObject=stream;
      mediarecorder=new MediaRecorder(stream);
      mediarecorder.ondataavailable=function(e){
       chunks.push(e.data)
       e.data=null;  
}
mediarecorder.onstop=function(e){
    blob=new Blob(chunks,{type:"video/mp4"});
    let videourl=window.URL.createObjectURL(blob);
    a.href=videourl;
    a.download="capture.mp4";
    console.log(a);
    a.click();
    

}
})

function count(){
    number++;
    document.getElementById('time').innerHTML= "Timer : " + number;
}
start.addEventListener('click',function startRecord(){
    mediarecorder.start()
    console.log('Record is started.')
    start.disabled=true;
    stopButton.disabled=false;
    pause.disabled=false;
    number = 0;
     MyInterval = setInterval(count,1000);
})
stopButton.addEventListener('click',function stopRecord(){
    setTimeout(() => {
        mediarecorder.stop();
    },500); 
    stopButton.disabled=true;
    resume.disabled=true;
    pause.disabled=true;
    start.disabled=false;
    console.log('Record is stopped.');
    console.log(MyInterval);
    clearInterval(MyInterval);
    MyInterval = 0;
    sayi = 0;
})
resume.addEventListener('click',async function resumeRecord(){
    mediarecorder.resume();
   console.log('Media Resuming')
    pause.disabled=false;
    resume.disabled=true;
    MyInterval = setInterval("count()",1000);
})
pause.addEventListener('click', async function pauseRecord(){
    setTimeout(() => {
        mediarecorder.pause();
    },200);    
    console.log('Media Paused');
    resume.disabled=false;
    pause.disabled=true;
    clearInterval(MyInterval);
}) 


