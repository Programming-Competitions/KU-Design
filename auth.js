console.log(firebase);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const signInBtn = document.getElementById("login-btn");
const signOutBtn = document.getElementById("logout-btn");

signOutBtn.style.display = "none";

signInBtn.onclick = () => auth.signInWithPopup(provider);
if (document.getElementById("GLogin")) {
  const GsignInBtn = document.getElementById("GLogin");
  GsignInBtn.onclick = () => auth.signInWithPopup(provider);
}
signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged((user) => {
  if (user) {
    // signed in
    signInBtn.style.display = "none";
    signOutBtn.style.display = "block";
    console.log("signed in");
  } else {
    // not signed in
    signInBtn.style.display = "block";
    signOutBtn.style.display = "none";
    console.log("signed out");
  }
});
