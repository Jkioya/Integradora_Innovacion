// Config Firebase (mismo que en index)
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

// Inicializar Firebase Auth
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();




document.addEventListener('DOMContentLoaded', function () {
    const h2s = document.querySelectorAll('.content h2.indice');
    const h3s = document.querySelectorAll('.content h3#sub');
    const indexContent = document.getElementById('index-content');

    let lastH2Container = null;

  
    // --- Crear índice para H2 ---
    h2s.forEach((heading, index) => {
        if (!heading.id) heading.id = 'section-' + index;

        const wrapper = document.createElement('div');
        wrapper.classList.add('index-item');

        const link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;

        link.addEventListener('click', function (e) {
            e.preventDefault();
            const yOffset = -200;
            const element = document.getElementById(heading.id);
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        });

        wrapper.appendChild(link);
        indexContent.appendChild(wrapper);

        lastH2Container = wrapper; // Guardamos dónde agregar subtítulos más tarde
    });

    // --- Agregar subtítulos (H3 con id="sub") debajo del último H2 ---
    h3s.forEach((subheading, index) => {
        if (!subheading.id.includes("sub-")) {
            subheading.id = "sub-" + index;
        }

        // Crear enlace de subíndice
        const subLink = document.createElement('a');
        subLink.href = "#" + subheading.id;
        subLink.textContent = "• " + subheading.textContent;
        subLink.classList.add('subindex');

        subLink.addEventListener('click', function (e) {
            e.preventDefault();
            const yOffset = -200;
            const element = document.getElementById(subheading.id);
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        });

        // Agregar debajo del último H2
        if (lastH2Container) {
            lastH2Container.appendChild(subLink);
        }
    });
});


/* --- Carrusel (sin cambios) --- */
function moveCarousel(element, direction) {
    const wrapper = element.parentElement;
    const track = wrapper.querySelector('.carousel-track');
    const images = track.querySelectorAll('img');
    const imageWidth = wrapper.offsetWidth;

    if (!wrapper.dataset.index) wrapper.dataset.index = 0;

    let index = parseInt(wrapper.dataset.index);
    index += direction;

    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;

    wrapper.dataset.index = index;

    track.style.transform = `translateX(-${index * imageWidth}px)`;
}


function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html"; // Redirige al login
    }).catch((error) => {
        alert(error.message);
    });
}
