js
let data = JSON.parse(localStorage.getItem('novelData') || '[]');
let currentStory = null;
let currentEpisode = null;


function newStory(){
data.unshift({title:'',private:false,episodes:[],wiki:'',timeline:[],nodes:[]});
currentStory = 0;
save();
}


function save(){
localStorage.setItem('novelData', JSON.stringify(data));
}


function addEpisode(){
data[currentStory].episodes.push({title:'',content:'',images:[]});
currentEpisode = data[currentStory].episodes.length-1;
save();
}


function addImage(file){
const r = new FileReader();
r.onload = () => {
data[currentStory].episodes[currentEpisode].images.push(r.result);
save();
};
r.readAsDataURL(file);
}
