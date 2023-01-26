
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, updateProfile, sendEmailVerification, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, get, set, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {firebaseConfig} from "./api.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

var but = document.getElementById('subup5');
var clo = document.getElementById('closeP');


var name = document.getElementById('userup');
var email = document.getElementById('emailup');
var numb = document.getElementById('numip');
var numba = document.getElementById('numip').value;
var pass = document.getElementById('passup');

var sEc = document.getElementById("sec52");
var rOll = document.getElementById("roll52");
var div = document.getElementById("errormsg")

var dIv1 = document.getElementById('sEE1');
var dIv2 = document.getElementById('sEE2');
function Required(){
  const db = getDatabase();
  const starCountRef = ref(db, sEc.value.toUpperCase()+"/"+rOll.value);
  onValue(starCountRef, (snapshot) => {
    if(snapshot.exists()){
      var popup1 = document.getElementById('popup');
      var h1 = document.getElementById('h1');
      dIv1.innerText = ""
      h1.innerText = ""
      dIv2.innerText = "This Section & Roll Already Exist !!!\nIf You are the real person then Meassage Us in Fb Page\n\nOr Enter Correct Section & Roll Number"
      var popupimg = document.getElementById('popup-img1');
      popup1.classList.add("open-popup");
      popupimg.classList.add("open-img");
      dIv2.classList.add("popup-div2")
      
      setTimeout(myGree, 4000);
      function myGree(){
        popup1.classList.remove("open-popup");
      };
    }else{
      InsertData();
    };
    });
}

function InsertData(){

    createUserWithEmailAndPassword(auth, email.value, pass.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            set(ref(db, sEc.value.toUpperCase()+"/"+rOll.value ),{
                Name: name.value,
                Password: pass.value,
                Mobile_NO: numb.value,
                Email: email.value
              })
              .then(() => {
                // Data saved successfully!
                const auth = getAuth();
                sendEmailVerification(auth.currentUser)
                .then(() => {
                  updateProfile(auth.currentUser, {
                    displayName: name.value+' '+rOll.value+sEc.value
                  })
                  .then(() =>{
                    
                    const displayName = user.displayName;
                    dIv2.classList.remove("popup-div2")
                    dIv2.classList.add("popup-div1")
                    dIv1.innerText = ""
                    dIv2.innerText = "Veryfication Email Send\nSignUp Successfully\nVerify Email Then Login"
                    var popup1 = document.getElementById('popup');
                    var popupimg = document.getElementById('popup-img2');
                    popup1.classList.add("open-popup");
                    popupimg.classList.add("open-img");
                    // The user object has basic properties such as display name, email, etc.
                    container.classList.remove("sign-up-mode");
                    
                  })
                });
                
                
              })
              .catch((error) => {
                // The write failed...
                alert(error)
              });
              
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            var h1 = document.getElementById('h1');
            dIv1.innerText = ""
            h1.innerText = ""
            dIv2.innerText = "This Email Already in Use !\nUse Another Email !"
            var popup1 = document.getElementById('popup');
            var popupimg = document.getElementById('popup-img1');
            popup1.classList.add("open-popup");
            popupimg.classList.add("open-img");
            dIv2.classList.add("popup-div2")
            setTimeout(myGree, 3000);
            function myGree(){
              popup1.classList.remove("open-popup");
            }

        });
        return false;
      };
function Req(){
        
    if (name.value === '' || name.value ==null){
      div.innerText =  "Pls Enter a Username ! Then Enter Submit"
    }
    else if(sEc.value === '' || sEc.value ==null){
      div.innerText =  "Pls Enter a Section between A,B,C and D !  Then Enter Submit"
    }
    else if(rOll.value === "" || rOll.value ==null){
      div.innerText =  "Pls Enter a Roll Number !  Then Enter Submit"
    }
    else if(rOll.value <= 0 || rOll.value >= 60){
      div.innerText =  "Pls Enter a Roll Number from 1 to 60 !  Then Enter Submit"
    }
    else if(numb.value === '' || numb.value ==null){
      div.innerText =  "Pls Enter a Mobile Number !  Then Enter Submit"
    }
    else if(!(numb.value.match(/^\d{11}$/))){
        div.innerText =  "Pls Enter a 11 Digit Mobile Number !  Then Enter Submit"
      }
    else if(email.value === '' || email.value ==null){
      div.innerText =  "Pls Enter a Email !  Then Enter Submit"
    }
    else if(pass.value === '' || pass.value ==null){
      div.innerText =  "Pls Enter a Password !  Then Enter Submit"
    }
    else if(pass.value.length <= 5){
      div.innerText =  "Pls Enter Greatter Than 6 Digit Password !  Then Enter Submit"
    }
    else{
      Required();
    }
    
    
  }
but.addEventListener('click', Req);
