js
const firebaseConfig = {
apiKey: "YOUR_KEY",
authDomain: "YOUR_DOMAIN",
databaseURL: "YOUR_DB",
projectId: "YOUR_ID"
};
firebase.initializeApp(firebaseConfig);
const commentsRef = firebase.database().ref('comments');


function postComment(story, ep, name, text){
commentsRef.child(story+'-'+ep).push({name,text,time:Date.now()});
}
