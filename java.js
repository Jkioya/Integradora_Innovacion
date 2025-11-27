// Config Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCjS-RCUbqCpQfE9t_08fr6TshjBPgkQm4",
    authDomain: "integradora-web.firebaseapp.com",
    databaseURL: "https://integradora-web-default-rtdb.firebaseio.com",
    projectId: "integradora-web",
    storageBucket: "integradora-web.firebasestorage.app",
    messagingSenderId: "710416784386",
    appId: "1:710416784386:web:a84c94c30469bb3ba8db1b",
    measurementId: "G-VYW9R20E83"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = firebase.firestore();

// Registro
function registrar() {
    var nombre = document.getElementById("regNombre").value;
    var edad = document.getElementById("regEdad").value;
    var correo = document.getElementById("regCorreo").value;
    var usuario = document.getElementById("regUsuario").value;
    var pass = document.getElementById("regPass").value;

    auth.createUserWithEmailAndPassword(correo, pass)
        .then(function(res) {
            var uid = res.user.uid;

            db.collection("usuarios").doc(uid).set({
                nombre: nombre,
                edad: edad,
                correo: correo,
                usuario: usuario
            });

            alert("Registro exitoso. Ahora inicia sesión.");
        })
        .catch(function(e) {
            alert(e.message);
        });
}

// Login
function login() {
    var correo = document.getElementById("loginCorreo").value;
    var pass = document.getElementById("loginPass").value;

    auth.signInWithEmailAndPassword(correo, pass)
        .then(function() {
            window.location.href = "innovaciones.html";
        })
        .catch(function(e) {
            alert(e.message);
        });
}
