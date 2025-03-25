// Lógica del juego Deriva Run

let historia = [
    "Alden entra a un pueblo abandonado. Tres caminos se bifurcan ante él: la taberna, el pozo y el bosque. Un mapa roto en el suelo muestra símbolos algebraicos. Para elegir la ruta correcta, debe resolver un enigma matemático. \\[ f(x) = 2x^4 - 3x + 5 \\]",
    "Un espíritu ancestral bloquea el camino. Sus ojos brillan con ecuaciones flotantes. 'Resuelve esto, mortal, o quedarás atrapado aquí', dice.(Regla del producto):  \\[ f(x) = (3x + 2)(4x - 5) \\]",
    "Un dragón herido custodia el Corazón de Dragón. 'Solo los dignos pueden tomarlo', ruge, mientras dibuja símbolos en el aire con su garra.(Regla del cociente) \\[ f(x) = \\frac{x^2 + 4}{3x} \\]",
    "Un altar de piedra muestra una inscripción: 'El poder infinito nace de la pérdida infinita'. Para activar el Corazón, debes resolver un último enigma (Regla de la cadena) \\[ f(x) = \\sin(5x^2) \\]",
    "Lyra está encerrada en una jaula de energía oscura. El Príncipe ríe: '¡El Corazón te corromperá como a mí!' (Producto + Cadena) \\[ f(x) = e^{3x} \\cdot \\ln(2x) \\]",
    "El Corazón late en tu mano. Voces susurran en tu mente: '¡Destruye todo!', '¡Domínalos!', '¡Sacrifícate!'. (Cociente + Producto)  \\[ f(x) = \\frac{(x^2 + 1)\\sqrt{x}}{4x - 1} \\]"
];

let derivadas = [
    ["8x^3 - 3", "6x^3 - 3", "2x^3 - 3"],
    ["24x - 7", "12x - 10", "12x^2"],
    ["\\frac{3x^2 - 12}{9x^2}", "\\frac{2x}{3}", "\\frac{x^2 + 4}{3}"],
    ["10x \\cos(5x^2)", "\\cos(5x^2)", "5x^2 \\cos(5x^2)"],
    ["e^{3x} \\left(3\\ln(2x) + \\frac{1}{x}\\right)", "\\frac{e^{3x}}{x}", "3e^{3x} + \\frac{1}{x}"],
    ["\\frac{(2x^{\\frac{3}{2}} + \\frac{x^2 + 1}{2x^{\\frac{1}{2}}})(4x - 1) - 4(x^2 + 1)x^{\\frac{1}{2}}}{(4x - 1)^2}", "\\frac{2x}{2\\sqrt{x}}", "\\frac{x^2 + 1}{4x - 1} \\cdot \\frac{1}{2\\sqrt{x}}"]
];

let correctas = 0;
let corrupcion = 0;
let errores = [];
let indiceHistoria = 0;
let vida = 50;
let escudo = 50;
let musicaFondo;
let cordura = 100;

// Arte ASCII para un personaje
let personaje = `
  O
 /|\\
 / \\
`;

// Arte ASCII para el espíritu
let espiritu = `
       .-~-.  
      { O O }  
       \ ~ /  
     .-~* ~*-.  
    /  ~~~~~  \  
   |  ~~~~~~~  |  
    \_________/  
       |   |  
       ~~~~~  
`;

// Arte ASCII para el dragón
let dragon = `
       \\\|||||///          
        ~-.   .-~            
           \ /               
           / \               
       .-~/   \~-.           
      /   \   /   \          
     |     \ /     |         
     |      ♥      |         
      \           /          
       ~-._____.-~            
`;

// Arte ASCII para el altar
let altar = `
       .-~~~-.      
      |  / \  |     
     |  |_o_|  |    
     |  \_|_/  |    
      \       /     
       \¸.♥.¸/  
      ~-------~    
`;

// Arte ASCII para la jaula
let jaula = `
           _\/\/_          
        .-~\|||||/~-.       
       /  \|||||||/  \      
      |    \|||||/    |     
      |     ~~~~~     |     
      |   _/~~X~~\_   |     
      | / \|||||||/ \ |    
      |/   \|||||/   \|    
      \     ~~~~~     /     
       ~-.         .-~      
          ~-.   .-~         
            ~~~~~           
`;

// Arte ASCII para el corazón
let corazon = `
            .-~-.  
         .-~     ~-.  
        /           \  
       |             |  
       |    .---.    |  
        \  '     '  /  
         ~-.     .-~  
            ~-.-~  
`;

// Opciones para cada escenario
let opciones = [
    ["Investigar la taberna", "Bajar al pozo", "Adentrarte en el bosque"],
    ["Ofrecer tu espada", "Atacarlo", "Ignorarlo"],
    ["Matarlo", "Negociar", "Robarlo y huir"],
    ["Sacrificar el anillo de Lyra", "Usar tu sangre", "Ignorar el enigma"],
    ["Usar el Corazón", "Buscar una llave alternativa", "Rendirte"],
    ["Abrazar el poder", "Destruir el Corazón", "Encerrarte en el abismo"],
];

let escenarios = [
    `
     ||||
    //  \\
   //    \\
  //______\\
  ||      ||
  ||______||
  ||      ||
  ||______||
  ||______||
`,
    // Otros escenarios pueden ser añadidos aquí
];

let textoHistoria = [
    "Alden entra a un pueblo abandonado. Tres caminos se bifurcan ante él: la taberna, el pozo y el bosque. Un mapa roto en el suelo muestra símbolos algebraicos. Para elegir la ruta correcta, debe resolver un enigma matemático.",
    "Un espíritu ancestral bloquea el camino. Sus ojos brillan con ecuaciones flotantes. 'Resuelve esto, mortal, o quedarás atrapado aquí', dice.(Regla del producto):",
    "Un dragón herido custodia el Corazón de Dragón. 'Solo los dignos pueden tomarlo', ruge, mientras dibuja símbolos en el aire con su garra.(Regla del cociente)",
    "Un altar de piedra muestra una inscripción: 'El poder infinito nace de la pérdida infinita'. Para activar el Corazón, debes resolver un último enigma (Regla de la cadena)",
    "Lyra está encerrada en una jaula de energía oscura. El Príncipe ríe: '¡El Corazón te corromperá como a mí!' (Producto + Cadena)",
    "El Corazón late en tu mano. Voces susurran en tu mente: '¡Destruye todo!', '¡Domínalos!', '¡Sacrifícate!'. (Cociente + Producto)"
];

let formulasHistoria = [
    "\\[ f(x) = 2x^4 - 3x + 5 \\]",
    "\\[ f(x) = (3x + 2)(4x - 5) \\]",
    "\\[ f(x) = \\frac{x^2 + 4}{3x} \\]",
    "\\[ f(x) = \\sin(5x^2) \\]",
    "\\[ f(x) = e^{3x} \\cdot \\ln(2x) \\]",
    "\\[ f(x) = \\frac{(x^2 + 1)\\sqrt{x}}{4x - 1} \\]"
];

function actualizarBarras() {
    const vidaBar = document.getElementById('vida-bar');
    const escudoBar = document.getElementById('escudo-bar');
    const corduraDiv = document.getElementById('cordura');
    vidaBar.style.width = `${vida}%`;
    escudoBar.style.width = `${escudo}%`;
    corduraDiv.textContent = `Cordura: ${cordura}%`;
    vidaBar.style.fontSize = '1.2em';
    escudoBar.style.fontSize = '1.2em';
}

function iniciarIntro() {
    const areaJuego = document.getElementById('game-area');
    areaJuego.textContent = '';
    mostrarIntro();
    // La música de fondo se iniciará al presionar 'Iniciar Aventura'
}

function mostrarIntro() {
    const areaJuego = document.getElementById('game-area');
    const introTexto = [
        "Alden, un guerrero destrozado, busca venganza tras perder su pueblo y a su esposa Lyra, capturada por el Príncipe de la Oscuridad.",
        "Un anciano le revela la existencia del Corazón de Dragón, una reliquia en la Montaña del Alba que otorga poder infinito, pero advierte: 'Quien lo use perderá su alma'.",
        "Decidido a rescatar a Lyra, Alden inicia su viaje, ignorando que el precio del poder podría convertirlo en el mismo monstruo que juró destruir.",
        "🗡️ Tu misión: Enfrentar enigmas matemáticos, criaturas oscuras y la corrupción del Corazón.",
        "⚠️ Tu dilema: ¿Sacrificarás tu humanidad para salvar a quien amas?"
    ];
    let index = 0;
    const interval = setInterval(() => {
        if (index < introTexto.length) {
            areaJuego.textContent += introTexto[index] + "\n";
            const sonido = new Audio('audio/sonido.mp3');
            sonido.volume = 0.8;
            sonido.play().catch(error => console.log(error));
            index++;
        } else {
            clearInterval(interval);
            const tituloSonido = new Audio('audio/titulo.mp3');
            tituloSonido.volume = 0.8;
            tituloSonido.play();
            tituloSonido.onended = () => {
                areaJuego.textContent += "\n\n" +
                " ██╗  ██╗██╗██████╗ ███████╗███╗   ██╗████████╗██████╗  █████╗ ████████╗███████╗██████╗ \n" +
                "██║  ██║██║██╔══██╗██╔════╝████╗  ██║╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██╔══██╗\n" +
                "███████║██║██║  ██║█████╗  ██╔██╗ ██║   ██║   ██████╔╝███████║   ██║   █████╗  ██║  ██║\n" +
                "██╔══██║██║██║  ██║██╔══╝  ██║╚██╗██║   ██║   ██╔══██╗██╔══██║   ██║   ██╔══╝  ██║  ██║\n" +
                "██║  ██║██║██████╔╝███████╗██║ ╚████║   ██║   ██║  ██║██║  ██║   ██║   ███████╗██████╔╝\n" +
                "╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═════╝ \n";
                const iniciarButton = document.createElement('button');
                iniciarButton.textContent = 'Iniciar Aventura';
                iniciarButton.onclick = () => {
                    areaJuego.textContent = '';
                    musicaFondo = new Audio('audio/music.mp3');
                    musicaFondo.volume = 0.5;
                    musicaFondo.loop = true;
                    musicaFondo.play().catch(error => console.log(error));
                    mostrarHistoria();
                };
                document.getElementById('opciones').appendChild(iniciarButton);
            };
        }
    }, 2000);
}

function mostrarHistoria() {
    const areaJuego = document.getElementById('game-area');
    const opcionesDiv = document.getElementById('opciones');
    areaJuego.style.fontSize = '1.5em';
    areaJuego.textContent = '';
    opcionesDiv.innerHTML = '';
    const pasosAudio = new Audio(indiceHistoria === 2 ? 'audio/pasosdragon.mp3' : 'audio/pasos.mp3');
    pasosAudio.volume = 1.0;
    pasosAudio.play().catch(error => console.log(error));
    if (indiceHistoria === 2) {
        pasosAudio.onended = () => {
            const rugidoAudio = new Audio('audio/rugido.mp3');
            rugidoAudio.volume = 1.0;
            rugidoAudio.play().catch(error => console.log(error));
        };
    }
    const dialogoAudio = new Audio('audio/dialogo.mp3');
    dialogoAudio.volume = 0.3;
    dialogoAudio.loop = true;
    dialogoAudio.play().catch(error => console.log(error));
    if (indiceHistoria < textoHistoria.length) {
        let texto = escenarios[indiceHistoria] ? escenarios[indiceHistoria] : '';
        texto += "\n" + personaje;
        if (indiceHistoria === 1) {
            texto += "\n" + espiritu;
        } else if (indiceHistoria === 2) {
            texto += "\n" + dragon;
        } else if (indiceHistoria === 3) {
            texto += "\n" + altar;
        } else if (indiceHistoria === 4) {
            texto += "\n" + jaula;
        } else if (indiceHistoria === 5) {
            texto += "\n" + corazon;
        }
        texto += "\n\n" + textoHistoria[indiceHistoria];
        
        // Crear un div para la fórmula
        const formulaDiv = document.createElement('div');
        formulaDiv.innerHTML = formulasHistoria[indiceHistoria];
        
        let index = 0;
        const interval = setInterval(() => {
            if (index < texto.length) {
                areaJuego.textContent += texto[index];
                index++;
            } else {
                clearInterval(interval);
                dialogoAudio.pause();
                areaJuego.appendChild(formulaDiv);
                // Renderizar LaTeX
                MathJax.typeset([formulaDiv]);
                if (indiceHistoria < opciones.length) {
                    const opcionesTexto = document.createElement('div');
                    opcionesTexto.textContent = "\n\nOpciones: " + opciones[indiceHistoria].join(', ');
                    areaJuego.appendChild(opcionesTexto);
                }
                mostrarOpciones();
            }
        }, 25);
    } else {
        areaJuego.textContent = "Fin de la historia.";
    }
}

function mezclarOpciones(opciones, derivadas) {
    for (let i = opciones.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opciones[i], opciones[j]] = [opciones[j], opciones[i]];
        [derivadas[i], derivadas[j]] = [derivadas[j], derivadas[i]];
    }
}

function mostrarOpciones() {
    const opcionesDiv = document.getElementById('opciones');
    if (indiceHistoria < derivadas.length) {
        derivadas[indiceHistoria].forEach((opcion, index) => {
            const button = document.createElement('button');
            button.innerHTML = `\\[${opcion}\\]`;
            button.style.fontSize = '1.2em';
            button.style.padding = '10px';
            button.onclick = () => choosePath(index);
            opcionesDiv.appendChild(button);
            // Renderizar LaTeX en el botón
            MathJax.typeset([button]);
        });
    }
}

function choosePath(opcionIndex) {
    let maldicion = '';
    let aumentoCorrupcion = 0;
    const respuestaCorrecta = derivadas[indiceHistoria][0];
    const opcionSeleccionada = derivadas[indiceHistoria][opcionIndex];
    const mensajeCorrectoDiv = document.getElementById('mensaje-correcto');
    const maldicionesDiv = document.getElementById('maldiciones');
    const corrupcionDiv = document.getElementById('corrupcion');
    const mensajeCorrupcionDiv = document.getElementById('mensaje-corrupcion');
    maldicionesDiv.style.fontSize = '1.2em';
    corrupcionDiv.style.fontSize = '1.2em';
    if (indiceHistoria === 0) {
        if (opcionSeleccionada === respuestaCorrecta) {
            correctas++;
            mensajeCorrectoDiv.textContent = "Alden descifra el mapa. Un atajo lo lleva rápidamente al bosque.";
        } else if (opcionIndex === 1) {
            maldicion = "Una trampa de cuchillas emerge del suelo. Pierde 15 de salud y aumenta 20% de corrupción.";
            aplicarDanio(15);
            aumentoCorrupcion = 20;
        } else if (opcionIndex === 2) {
            maldicion = "El piso colapsa. Cae a un foso lleno de arañas venenosas (-20 salud y +20% corrupción).";
            aplicarDanio(20);
            aumentoCorrupcion = 20;
        }
        indiceHistoria++;
        mostrarHistoria();
    } else if (indiceHistoria === 1) {
        if (opcionSeleccionada === respuestaCorrecta) {
            correctas++;
            mensajeCorrectoDiv.textContent = "El espíritu se disuelve en luces. 'Avanza... pero el precio será alto'.";
        } else if (opcionIndex === 1) {
            maldicion = "Una niebla oscura quema tu piel. Pierdes 1 vida máxima y aumenta 20% de corrupción.";
            aplicarDanio(10);
            aumentoCorrupcion = 20;
        } else if (opcionIndex === 2) {
            maldicion = "Te pierdes en el bosque. Criaturas invisibles te atacan (-30 salud y +20% corrupción).";
            aplicarDanio(30);
            aumentoCorrupcion = 20;
        }
        indiceHistoria++;
        mostrarHistoria();
    } else if (indiceHistoria === 2) {
        if (opcionSeleccionada === respuestaCorrecta) {
            correctas++;
            mensajeCorrectoDiv.textContent = "El dragón asiente. 'Toma el Corazón... pero te maldeciré'.";
        } else if (opcionIndex === 1) {
            maldicion = "El dragón escupe fuego. Tu armadura se derrite (-25 salud y +20% corrupción).";
            aplicarDanio(25);
            aumentoCorrupcion = 20;
        } else if (opcionIndex === 2) {
            maldicion = "El Corazón emite un pulso corrupto. Sientes que tu mente se nubla (+20% corrupción).";
            aumentoCorrupcion = 20;
        }
        indiceHistoria++;
        mostrarHistoria();
    } else if (indiceHistoria === 3) {
        if (opcionSeleccionada === respuestaCorrecta) {
            correctas++;
            mensajeCorrectoDiv.textContent = "El Corazón late con energía controlable. Sigues adelante.";
        } else if (opcionIndex === 1) {
            maldicion = "El templo colapsa. Una roca te golpea (-30 salud y +20% corrupción).";
            aplicarDanio(30);
            aumentoCorrupcion = 20;
        } else if (opcionIndex === 2) {
            maldicion = "El Corazón se fusiona con tu brazo. La oscuridad crece (+20% corrupción).";
            aumentoCorrupcion = 20;
        }
        indiceHistoria++;
        mostrarHistoria();
    } else if (indiceHistoria === 4) {
        if (opcionSeleccionada === respuestaCorrecta) {
            correctas++;
            mensajeCorrectoDiv.textContent = "El Príncipe grita: '¡No! ¡Esto no puede ser!' y se desintegra.";
        } else if (opcionIndex === 1) {
            maldicion = "El Príncipe te atraviesa con una espada oscura (-40 salud y +20% corrupción).";
            aplicarDanio(40);
            aumentoCorrupcion = 20;
        } else if (opcionIndex === 2) {
            maldicion = "El Corazón explota. Lyra grita mientras la energía te consume (+20% corrupción).";
            aumentoCorrupcion = 20;
        }
        indiceHistoria++;
        mostrarHistoria();
    } else if (indiceHistoria === 6) {
        if (opcionSeleccionada === respuestaCorrecta) {
            correctas++;
            mensajeCorrectoDiv.textContent = "Contienes la oscuridad. 'Lyra... perdóname', susurras antes de hundirte en el abismo.";
        } else if (opcionIndex === 1) {
            maldicion = "Ríes con voz distorsionada. '¡Ahora el poder es mío!'. Te conviertes en el nuevo Príncipe Oscuro.";
            aplicarDanio(50);
            aumentoCorrupcion = 20;
        } else if (opcionIndex === 2) {
            maldicion = "El Corazón explota. La fortaleza y el mundo entero se desintegran en llamas.";
            aplicarDanio(100);
            aumentoCorrupcion = 20;
        }
        indiceHistoria++;
        mostrarEpilogo();
        mostrarErrores();
    } else if (indiceHistoria % 2 !== 0) {
        if (opcionIndex === 0) {
            correctas++;
            mensajeCorrectoDiv.textContent = "Correcto";
        } else {
            corrupcion += 20;
            errores.push(`Escenario ${Math.floor(indiceHistoria / 2) + 1}: Error en derivada`);
            mensajeCorrectoDiv.textContent = "Incorrecto";
            maldicion = "Has cometido un error. La corrupción aumenta.";
            aumentoCorrupcion = 20;
        }
        indiceHistoria++;
        if (indiceHistoria < historia.length) {
            mostrarHistoria();
        } else {
            mostrarEpilogo();
            mostrarErrores();
        }
    }
    if (maldicion) {
        maldicionesDiv.textContent = maldicion;
    }
    if (aumentoCorrupcion > 0) {
        corrupcion += aumentoCorrupcion;
        actualizarCorrupcion();
    }
    actualizarBarras();
}

function actualizarCorrupcion() {
    document.getElementById('corrupcion').textContent = `Corrupción: ${corrupcion}%`;
    if (corrupcion >= 40 && !document.getElementById('corrupcion-audio')) {
        if (musicaFondo) {
            musicaFondo.pause();
            musicaFondo.currentTime = 0;
        }
        const corrupcionAudio = document.createElement('audio');
        corrupcionAudio.id = 'corrupcion-audio';
        corrupcionAudio.src = 'audio/corrupcion.mp3';
        corrupcionAudio.volume = 0.5;
        corrupcionAudio.loop = true;
        document.body.appendChild(corrupcionAudio);
        corrupcionAudio.play().catch(error => console.log(error));

        // Mostrar mensaje de corrupción y reducir cordura
        const mensajeCorrupcionDiv = document.getElementById('mensaje-corrupcion');
        mensajeCorrupcionDiv.textContent = "Tu corazón se corrompe -50% cordura";
        cordura -= 50;
        actualizarBarras();
    }
    if (corrupcion >= 80) {
        // Reducir cordura a 0% y cambiar el color del texto a rojo
        cordura = 0;
        const corduraDiv = document.getElementById('cordura');
        corduraDiv.style.color = 'red';
        corduraDiv.textContent = `Cordura: ${cordura}%`;

        // Cambiar el color de todo el texto a rojo
        document.body.style.color = 'red';

        // Aumentar ligeramente el volumen del audio de corrupción
        const corrupcionAudio = document.getElementById('corrupcion-audio');
        if (corrupcionAudio) {
            corrupcionAudio.volume = 0.4; // Aumentar el volumen
        }

        // Reproducir el audio cordura.mp3
        const corduraAudio = new Audio('audio/cordura.mp3');
        corduraAudio.volume = 0.8;
        corduraAudio.play().catch(error => console.log(error));

        // Cambiar el mensaje de corrupción
        const mensajeCorrupcionDiv = document.getElementById('mensaje-corrupcion');
        mensajeCorrupcionDiv.textContent = "DESCIENDES A LA LOCURA";
    }
}

function mostrarEpilogo() {
    const areaJuego = document.getElementById('game-area');
    areaJuego.textContent = '';
    
    // Detener todas las músicas
    if (musicaFondo) {
        musicaFondo.pause();
        musicaFondo.currentTime = 0;
    }
    const corrupcionAudio = document.getElementById('corrupcion-audio');
    if (corrupcionAudio) {
        corrupcionAudio.pause();
        corrupcionAudio.currentTime = 0;
    }
    
    if (correctas >= 5) {
        const winAudio = new Audio('audio/win.mp3');
        winAudio.volume = 0.8;
        winAudio.play().catch(error => console.log(error));
        areaJuego.textContent = "Destruyes el Corazón. Lyra te abraza mientras tu cuerpo se desvanece. 'Gracias', dice entre lágrimas (Final Noble)";
    } else if (correctas >= 3) {
        areaJuego.textContent = "Te encierras en una dimensión oscura. Lyra deja flores en tu honor cada año. (Final trágico)";
    } else {
        areaJuego.textContent = "Gobernarás un reino de sombras. Lyra, ahora es tu prisionera, Ríes con voz distorsionada. Ahora eres el Príncipe Oscuro (Final Corrupto)";
    }
    const recargarButton = document.createElement('button');
    recargarButton.textContent = 'Reintentar';
    recargarButton.onclick = () => location.reload();
    document.getElementById('opciones').appendChild(recargarButton);
}

function mostrarErrores() {
    console.log("=== RESUMEN MATEMÁTICO ===");
    errores.forEach(error => console.log(`- ${error}`));
    console.log(`Total de Aciertos: ${correctas}/7 | Nivel de Corrupción: ${corrupcion}`);
}

function aplicarDanio(danio) {
    if (escudo >= danio) {
        escudo -= danio;
    } else {
        danio -= escudo;
        escudo = 0;
        vida -= danio;
    }
    if (vida <= 0) {
        vida = 0;
        // Detener todas las músicas
        if (musicaFondo) {
            musicaFondo.pause();
            musicaFondo.currentTime = 0;
        }
        const corrupcionAudio = document.getElementById('corrupcion-audio');
        if (corrupcionAudio) {
            corrupcionAudio.pause();
            corrupcionAudio.currentTime = 0;
        }
        // Detener el audio de diálogo
        const dialogoAudio = document.querySelector('audio[src="audio/dialogo.mp3"]');
        if (dialogoAudio) {
            dialogoAudio.pause();
            dialogoAudio.currentTime = 0;
        }
        // Detener cualquier otro audio que esté sonando
        const allAudio = document.querySelectorAll('audio');
        allAudio.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        
        const looserAudio = new Audio('audio/looser.mp3');
        looserAudio.volume = 0.8;
        looserAudio.play().catch(error => console.log(error));
        setTimeout(() => {
            alert('HAS PERDIDO. ¿Quieres volver a intentarlo?');
            location.reload();
        }, 1000);
        return;
    }
    actualizarBarras();
}

window.onload = function() {
    const areaJuego = document.getElementById('game-area');
    const startButton = document.createElement('button');
    startButton.textContent = 'Comenzar Introducción';
    startButton.onclick = iniciarIntro;
    areaJuego.appendChild(startButton);

    // Crear un elemento para mostrar mensajes de opciones correctas
    const mensajeCorrectoDiv = document.createElement('div');
    mensajeCorrectoDiv.id = 'mensaje-correcto';
    mensajeCorrectoDiv.style.marginTop = '20px';
    mensajeCorrectoDiv.style.color = 'orange';
    mensajeCorrectoDiv.style.fontSize = '1.5em';
    mensajeCorrectoDiv.style.position = 'absolute';
    mensajeCorrectoDiv.style.top = '10px';
    mensajeCorrectoDiv.style.left = '10px';
    document.body.appendChild(mensajeCorrectoDiv);

    // Crear un elemento para mostrar el mensaje de corrupción
    const mensajeCorrupcionDiv = document.createElement('div');
    mensajeCorrupcionDiv.id = 'mensaje-corrupcion';
    mensajeCorrupcionDiv.style.color = 'red';
    mensajeCorrupcionDiv.style.fontSize = '1.2em';
    mensajeCorrupcionDiv.style.position = 'absolute';
    mensajeCorrupcionDiv.style.top = '50px';
    mensajeCorrupcionDiv.style.left = '10px';
    document.body.appendChild(mensajeCorrupcionDiv);

    // Crear elemento para mostrar la cordura como porcentaje
    const corduraDiv = document.createElement('div');
    corduraDiv.id = 'cordura';
    corduraDiv.style.color = 'green';
    corduraDiv.style.fontSize = '1.2em';
    corduraDiv.style.position = 'absolute';
    corduraDiv.style.top = '80px';
    corduraDiv.style.left = '10px';
    corduraDiv.textContent = `Cordura: ${cordura}%`;
    document.body.appendChild(corduraDiv);

    // Crear elementos para maldiciones y corrupción si no existen
    if (!document.getElementById('maldiciones')) {
        const maldicionesDiv = document.createElement('div');
        maldicionesDiv.id = 'maldiciones';
        document.body.appendChild(maldicionesDiv);
    }
    if (!document.getElementById('corrupcion')) {
        const corrupcionDiv = document.createElement('div');
        corrupcionDiv.id = 'corrupcion';
        document.body.appendChild(corrupcionDiv);
    }

    // Crear barras de vida y escudo si no existen
    if (!document.getElementById('vida-bar')) {
        const vidaBar = document.createElement('div');
        vidaBar.id = 'vida-bar';
        document.body.appendChild(vidaBar);
    }
    if (!document.getElementById('escudo-bar')) {
        const escudoBar = document.createElement('div');
        escudoBar.id = 'escudo-bar';
        document.body.appendChild(escudoBar);
    }

    actualizarBarras();
}; 