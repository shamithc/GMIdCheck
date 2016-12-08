// TODO(DEVELOPER): Change the values below using values from the initialization snippet: Firebase Console > Overview > Add Firebase to your web app.
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAxC3CTjhUj27beWOue1C2jRF77vm4GDXQ",
    authDomain: "gmidcheck.firebaseapp.com",
    databaseURL: "https://gmidcheck.firebaseio.com",
    storageBucket: "gmidcheck.appspot.com",
    messagingSenderId: "355376490978"
};

firebase.initializeApp(config);

/**
 * initApp handles setting up the Firebase context and registering
 * callbacks for the auth status.
 */
function initApp(id) {
    var database = firebase.database();
    firebase.database().ref('/' + id).once('value').then(function(snapshot) {
        if (snapshot.val()) {
          renderStatus('Already in your list');
        } else {
          renderStatus('Please note this profile');
        }
    });
}

function renderStatus(statusText) {
    document.getElementById('status').textContent = statusText;
}

window.onload = function() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      var urlString = tabs[0].url;
      var idPatten = /(\d+)$/;
      var id = urlString.match(idPatten);
      if(id){
        initApp(id[0]);
      }else{
        renderStatus('You are in a different TAB');
      }
    });
};
