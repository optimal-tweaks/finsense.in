var firebaseConfig = {
  apiKey: "AIzaSyAOdDXlPTgXvXqIWEOAky9AcJHoQW3m7d8",
  authDomain: "finsense-wealth-minimal.firebaseapp.com",
  databaseURL: "https://finsense-wealth-minimal-default-rtdb.firebaseio.com",
  projectId: "finsense-wealth-minimal",
  storageBucket: "finsense-wealth-minimal.appspot.com",
  messagingSenderId: "85091451786",
  appId: "1:85091451786:web:29a32618ed67f9de603e73"
};
// Initialize Firebase
if (navigator.onLine) {
  firebase.initializeApp(firebaseConfig);

  //Create a firebase Reference
  var messagesRef = firebase.database().ref('messages');
}



//Fetch the form element
document.getElementById('email-form').addEventListener('submit', submitForm);

function submitForm(evt) {
  evt.preventDefault();

  //Fetch data
  var name = getInputVal('name');
  var phone = getInputVal('Phone-Number');
  var email = getInputVal('Email');
  var message = getInputVal('Message');

  //Check Internet connectivity
  if (navigator.onLine) {

    saveToFirebase(name, phone, email, message);

    // Show Alert 
    document.querySelector('.w-form-done-submitting').style.display = 'block';

    //Hide Alert after 5 secs
    setTimeout(function () {
      document.querySelector('.w-form-done-submitting').style.display = 'none';
    }, 5000);
  }
  else {
    //Show Error message
    document.querySelector('.w-form-fail-internet').style.display = 'block';
    //Hide Error after 3 secs
    setTimeout(function () {
      document.querySelector('.w-form-fail-internet').style.display = 'none';
    }, 5000);
  }


  //Reset form data
  document.getElementById('email-form').reset();


} // handle 

// Function to get the value
function getInputVal(id) {
  return document.getElementById(id).value;
}

function saveToFirebase(name, phone, email, message) {
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    phone: phone,
    email: email,
    message: message
  }, function (error) {
    if (error) {
      //Show Error message
      document.querySelector('.w-form-fail-submitting').style.display = 'block';
      //Hide Error after 3 secs
      setTimeout(function () {
        document.querySelector('.w-form-fail-submitting').style.display = 'none';
      }, 3000);
    }
  });
}



