function signup(){auth.createUserWithEmailAndPassword(email.value,password.value).then(()=>alert("Created"));}
function loginUser(){auth.signInWithEmailAndPassword(email.value,password.value).then(()=>alert("Login OK"));}
function logout(){auth.signOut();}
