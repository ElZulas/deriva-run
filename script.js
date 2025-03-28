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
    ["8x^3 - 3", "8x^3 - 2", "8x^3 - 4"],
    ["24x - 7", "24x - 8", "24x - 6"],
    ["\\frac{3x^2 - 12}{9x^2}", "\\frac{3x^2 - 12}{8x^2}", "\\frac{3x^2 - 12}{10x^2}"],
    ["10x \\cos(5x^2)", "10x \\cos(5x^3)", "10x \\cos(5x)"],
    ["e^{3x} \\left(3\\ln(2x) + \\frac{1}{x}\\right)", "e^{3x} \\left(3\\ln(2x) + \\frac{2}{x}\\right)", "e^{3x} \\left(3\\ln(2x) + \\frac{1}{2x}\\right)"],
    ["\\frac{(2x^{\\frac{3}{2}} + \\frac{x^2 + 1}{2x^{\\frac{1}{2}}})(4x - 1) - 4(x^2 + 1)x^{\\frac{1}{2}}}{(4x - 1)^2}", "\\frac{(2x^{\\frac{3}{2}} + \\frac{x^2 + 1}{2x^{\\frac{1}{2}}})(4x - 1) - 4(x^2 + 1)x^{\\frac{1}{2}}}{(4x - 1)^3}", "\\frac{(2x^{\\frac{3}{2}} + \\frac{x^2 + 1}{2x^{\\frac{1}{2}}})(4x - 1) - 4(x^2 + 1)x^{\\frac{1}{2}}}{(4x - 1)}"]
];

let correctas = 0;
let corrupcion = 0;
let errores = [];
let indiceHistoria = 0;
let vida = 50;
let escudo = 50;
let musicaFondo;
let cordura = 100;
let puntaje = 0;
let tiempoInicio = 0;
let tiempoTranscurrido = 0;
let temporizadorInterval;

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
    // Iniciar el temporizador cuando comienza la aventura
    if (!temporizadorInterval) {
        tiempoInicio = Date.now();
        temporizadorInterval = setInterval(() => {
            actualizarTiempo();
        }, 10); // Actualizar cada 10ms en lugar de cada 1000ms
    }

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

// Función para mezclar array (Fisher-Yates shuffle)
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Función para mostrar opciones
function mostrarOpciones() {
    const opcionesDiv = document.getElementById('opciones');
    opcionesDiv.innerHTML = '';
    
    if (indiceHistoria < derivadas.length) {
        // Crear una copia del array de derivadas y mezclarlo
        const derivadasMezcladas = mezclarArray([...derivadas[indiceHistoria]]);
        
        // Encontrar el índice de la respuesta correcta en el array mezclado
        const indiceCorrecto = derivadasMezcladas.findIndex(derivada => 
            derivada === derivadas[indiceHistoria][0] // La primera derivada es la correcta
        );

        derivadasMezcladas.forEach((derivada, index) => {
            const button = document.createElement('button');
            button.innerHTML = `\\[${derivada}\\]`;
            button.style.fontSize = '1.2em';
            button.style.padding = '10px';
            button.onclick = () => choosePath(index === indiceCorrecto ? 0 : 1);
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

    // Función auxiliar para actualizar el puntaje
    const actualizarPuntaje = (puntos) => {
        puntaje += puntos;
        document.getElementById('puntaje').textContent = `Puntaje: ${puntaje}`;
    };

    if (indiceHistoria === 0) {
        if (opcionSeleccionada === respuestaCorrecta) {
            correctas++;
            actualizarPuntaje(100);
            mensajeCorrectoDiv.textContent = "Alden descifra el mapa. Un atajo lo lleva rápidamente al bosque.";
        } else if (opcionIndex === 1) {
            actualizarPuntaje(-50);
            maldicion = "Una trampa de cuchillas emerge del suelo. Pierde 15 de salud y aumenta 20% de corrupción.";
            aplicarDanio(15);
            aumentoCorrupcion = 20;
        } else if (opcionIndex === 2) {
            actualizarPuntaje(-50);
            maldicion = "El piso colapsa. Cae a un foso lleno de arañas venenosas (-20 salud y +20% corrupción).";
            aplicarDanio(20);
            aumentoCorrupcion = 20;
        }
        indiceHistoria++;
        mostrarHistoria();
    } else if (indiceHistoria === 1) {
        if (opcionSeleccionada === respuestaCorrecta) {
            correctas++;
            actualizarPuntaje(100);
            mensajeCorrectoDiv.textContent = "El espíritu se disuelve en luces. 'Avanza... pero el precio será alto'.";
        } else if (opcionIndex === 1) {
            actualizarPuntaje(-50);
            maldicion = "Una niebla oscura quema tu piel. Pierdes 1 vida máxima y aumenta 20% de corrupción.";
            aplicarDanio(10);
            aumentoCorrupcion = 20;
        } else if (opcionIndex === 2) {
            actualizarPuntaje(-50);
            maldicion = "Te pierdes en el bosque. Criaturas invisibles te atacan (-30 salud y +20% corrupción).";
            aplicarDanio(30);
            aumentoCorrupcion = 20;
        }
        indiceHistoria++;
        mostrarHistoria();
    } else if (indiceHistoria === 2) {
        if (opcionSeleccionada === respuestaCorrecta) {
            correctas++;
            actualizarPuntaje(100);
            mensajeCorrectoDiv.textContent = "El dragón asiente. 'Toma el Corazón... pero te maldeciré'.";
        } else if (opcionIndex === 1) {
            actualizarPuntaje(-50);
            maldicion = "El dragón escupe fuego. Tu armadura se derrite (-25 salud y +20% corrupción).";
            aplicarDanio(25);
            aumentoCorrupcion = 20;
        } else if (opcionIndex === 2) {
            actualizarPuntaje(-50);
            maldicion = "El Corazón emite un pulso corrupto. Sientes que tu mente se nubla (+20% corrupción).";
            aumentoCorrupcion = 20;
        }
        indiceHistoria++;
        mostrarHistoria();
    } else if (indiceHistoria === 3) {
        if (opcionSeleccionada === respuestaCorrecta) {
            correctas++;
            actualizarPuntaje(100);
            mensajeCorrectoDiv.textContent = "El Corazón late con energía controlable. Sigues adelante.";
        } else if (opcionIndex === 1) {
            actualizarPuntaje(-50);
            maldicion = "El templo colapsa. Una roca te golpea (-30 salud y +20% corrupción).";
            aplicarDanio(30);
            aumentoCorrupcion = 20;
        } else if (opcionIndex === 2) {
            actualizarPuntaje(-50);
            maldicion = "El Corazón se fusiona con tu brazo. La oscuridad crece (+20% corrupción).";
            aumentoCorrupcion = 20;
        }
        indiceHistoria++;
        mostrarHistoria();
    } else if (indiceHistoria === 4) {
        if (opcionSeleccionada === respuestaCorrecta) {
            correctas++;
            actualizarPuntaje(100);
            mensajeCorrectoDiv.textContent = "El Príncipe grita: '¡No! ¡Esto no puede ser!' y se desintegra.";
        } else if (opcionIndex === 1) {
            actualizarPuntaje(-50);
            maldicion = "El Príncipe te atraviesa con una espada oscura (-40 salud y +20% corrupción).";
            aplicarDanio(40);
            aumentoCorrupcion = 20;
        } else if (opcionIndex === 2) {
            actualizarPuntaje(-50);
            maldicion = "El Corazón explota. Lyra grita mientras la energía te consume (+20% corrupción).";
            aumentoCorrupcion = 20;
        }
        indiceHistoria++;
        mostrarHistoria();
    } else if (indiceHistoria === 6) {
        if (opcionSeleccionada === respuestaCorrecta) {
            correctas++;
            actualizarPuntaje(100);
            mensajeCorrectoDiv.textContent = "Contienes la oscuridad. 'Lyra... perdóname', susurras antes de hundirte en el abismo.";
        } else if (opcionIndex === 1) {
            actualizarPuntaje(-50);
            maldicion = "Ríes con voz distorsionada. '¡Ahora el poder es mío!'. Te conviertes en el nuevo Príncipe Oscuro.";
            aplicarDanio(50);
            aumentoCorrupcion = 20;
        } else if (opcionIndex === 2) {
            actualizarPuntaje(-50);
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
            actualizarPuntaje(100);
            mensajeCorrectoDiv.textContent = "Correcto";
        } else if (opcionIndex === 1) {
            actualizarPuntaje(-50);
            corrupcion += 20;
            errores.push(`Escenario ${Math.floor(indiceHistoria / 2) + 1}: Error en derivada`);
            mensajeCorrectoDiv.textContent = "Incorrecto";
            maldicion = "Has cometido un error. La corrupción aumenta y pierdes vida.";
            aumentoCorrupcion = 20;
            aplicarDanio(25);
        } else {
            actualizarPuntaje(-50);
            corrupcion += 20;
            errores.push(`Escenario ${Math.floor(indiceHistoria / 2) + 1}: Error en derivada`);
            mensajeCorrectoDiv.textContent = "Incorrecto";
            maldicion = "Has cometido un error grave. La corrupción aumenta y pierdes mucha vida.";
            aumentoCorrupcion = 20;
            aplicarDanio(35);
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
        // Hacer que la maldición desaparezca después de 5 segundos
        setTimeout(() => {
            maldicionesDiv.textContent = '';
        }, 5000);
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
    // Detener el temporizador
    clearInterval(temporizadorInterval);
    
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
        areaJuego.textContent = `Destruyes el Corazón. Lyra te abraza mientras tu cuerpo se desvanece. 'Gracias', dice entre lágrimas (Final Noble)\n\nTiempo final: ${document.getElementById('tiempo').textContent}`;
        
        // Esperar 5 segundos antes de mostrar el botón del jefe final
        setTimeout(() => {
            // Detener la música de victoria
            winAudio.pause();
            winAudio.currentTime = 0;
            
            // Limpiar toda la interfaz
            areaJuego.textContent = '';
            document.getElementById('mensaje-correcto').style.display = 'none';
            document.getElementById('mensaje-corrupcion').style.display = 'none';
            document.getElementById('cordura').style.display = 'none';
            document.getElementById('maldiciones').style.display = 'none';
            document.getElementById('corrupcion').style.display = 'none';
            document.getElementById('vida-bar').style.display = 'none';
            document.getElementById('escudo-bar').style.display = 'none';
            document.getElementById('puntaje').style.display = 'none';
            document.getElementById('tiempo').style.display = 'none';
            document.getElementById('opciones').style.display = 'none';
            
            // Crear el botón del jefe final
            const jefeFinalButton = document.createElement('button');
            jefeFinalButton.textContent = '¿Te Sientes superior?';
            jefeFinalButton.style.position = 'absolute';
            jefeFinalButton.style.top = '50%';
            jefeFinalButton.style.left = '50%';
            jefeFinalButton.style.transform = 'translate(-50%, -50%)';
            jefeFinalButton.style.padding = '15px 30px';
            jefeFinalButton.style.fontSize = '1.5em';
            jefeFinalButton.style.backgroundColor = '#ff0000';
            jefeFinalButton.style.color = 'white';
            jefeFinalButton.style.border = 'none';
            jefeFinalButton.style.borderRadius = '5px';
            jefeFinalButton.style.cursor = 'pointer';
            jefeFinalButton.style.transition = 'all 0.3s ease';
            jefeFinalButton.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
            
            // Efecto hover
            jefeFinalButton.onmouseover = function() {
                this.style.transform = 'translate(-50%, -50%) scale(1.1)';
                this.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.8)';
            };
            
            jefeFinalButton.onmouseout = function() {
                this.style.transform = 'translate(-50%, -50%) scale(1)';
                this.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
            };
            
            // Función para cuando se hace clic en el botón del jefe
            jefeFinalButton.onclick = function() {
                // Hacer desaparecer el botón
                this.style.display = 'none';
                
                // Reproducir el sonido del botón
                const buttonSound = new Audio('audio/button.mp3');
                buttonSound.volume = 0.8;
                
                // Cuando termine el sonido del botón, reproducir la música del jefe
                buttonSound.onended = function() {
                    const jefeMusic = new Audio('audio/jefe.mp3');
                    jefeMusic.volume = 0.8;
                    jefeMusic.play().catch(error => console.log(error));
                    
                    // Esperar 5 segundos y mostrar la interfaz del jefe
                    setTimeout(() => {
                        // Crear el contenedor principal de la batalla
                        const battleContainer = document.createElement('div');
                        battleContainer.style.position = 'fixed';
                        battleContainer.style.top = '0';
                        battleContainer.style.left = '0';
                        battleContainer.style.width = '100%';
                        battleContainer.style.height = '100%';
                        battleContainer.style.backgroundColor = 'black';
                        battleContainer.style.display = 'flex';
                        battleContainer.style.flexDirection = 'column';
                        battleContainer.style.alignItems = 'center';
                        battleContainer.style.paddingTop = '200px';
                        
                        // Crear el área de batalla (caja blanca)
                        const battleBox = document.createElement('div');
                        battleBox.style.width = '600px';
                        battleBox.style.height = '200px';
                        battleBox.style.border = '4px solid white';
                        battleBox.style.marginBottom = '50px';
                        battleBox.style.position = 'relative';
                        
                        // Crear el corazón (alma del jugador)
                        const playerHeart = document.createElement('div');
                        playerHeart.style.width = '20px';
                        playerHeart.style.height = '20px';
                        playerHeart.style.backgroundColor = 'red';
                        playerHeart.style.position = 'absolute';
                        playerHeart.style.left = '50%';
                        playerHeart.style.top = '50%';
                        playerHeart.style.transform = 'translate(-50%, -50%)';
                        battleBox.appendChild(playerHeart);
                        
                        // Crear la barra de HP
                        const hpBar = document.createElement('div');
                        hpBar.style.position = 'absolute';
                        hpBar.style.bottom = '50px';
                        hpBar.style.left = '50px';
                        hpBar.style.display = 'flex';
                        hpBar.style.alignItems = 'center';
                        hpBar.style.color = 'white';
                        hpBar.style.fontFamily = 'monospace';
                        hpBar.style.fontSize = '24px';
                        
                        const hpLabel = document.createElement('span');
                        hpLabel.textContent = 'HP ';
                        
                        const hpBarBg = document.createElement('div');
                        hpBarBg.style.width = '200px';
                        hpBarBg.style.height = '20px';
                        hpBarBg.style.backgroundColor = 'red';
                        hpBarBg.style.marginLeft = '10px';
                        
                        const hpValue = document.createElement('span');
                        hpValue.textContent = ' 20/20';
                        hpValue.style.marginLeft = '10px';
                        
                        hpBar.appendChild(hpLabel);
                        hpBar.appendChild(hpBarBg);
                        hpBar.appendChild(hpValue);
                        
                        // Crear el área de botones de acción
                        const actionButtons = document.createElement('div');
                        actionButtons.style.display = 'flex';
                        actionButtons.style.gap = '20px';
                        actionButtons.style.marginTop = '50px';
                        
                        // Solo crear el botón FIGHT
                        const fightButton = document.createElement('button');
                        fightButton.textContent = 'FIGHT';
                        fightButton.style.backgroundColor = 'transparent';
                        fightButton.style.border = 'none';
                        fightButton.style.color = 'white';
                        fightButton.style.fontSize = '24px';
                        fightButton.style.fontFamily = 'monospace';
                        fightButton.style.cursor = 'pointer';
                        fightButton.style.padding = '10px 20px';
                        
                        // Efecto hover amarillo característico de Undertale
                        fightButton.onmouseover = () => {
                            fightButton.style.color = 'yellow';
                        };
                        fightButton.onmouseout = () => {
                            fightButton.style.color = 'white';
                        };
                        
                        actionButtons.appendChild(fightButton);
                        
                        // Agregar todo al contenedor principal
                        battleContainer.appendChild(battleBox);
                        battleContainer.appendChild(hpBar);
                        battleContainer.appendChild(actionButtons);
                        
                        // Agregar el contenedor al body
                        document.body.appendChild(battleContainer);
                    }, 5000);
                };
                
                buttonSound.play().catch(error => console.log(error));
            };
            
            document.body.appendChild(jefeFinalButton);
        }, 5000); // 5000ms = 5 segundos
    } else if (correctas >= 3) {
        areaJuego.textContent = `Te encierras en una dimensión oscura. Lyra deja flores en tu honor cada año. (Final trágico)\n\nTiempo final: ${document.getElementById('tiempo').textContent}`;
        const recargarButton = document.createElement('button');
        recargarButton.textContent = 'Reiniciar Juego';
        recargarButton.onclick = () => window.location.reload();
        areaJuego.appendChild(recargarButton);
    } else {
        areaJuego.textContent = `Gobernarás un reino de sombras. Lyra, ahora es tu prisionera, Ríes con voz distorsionada. Ahora eres el Príncipe Oscuro (Final Corrupto)\n\nTiempo final: ${document.getElementById('tiempo').textContent}`;
        const recargarButton = document.createElement('button');
        recargarButton.textContent = 'Reiniciar Juego';
        recargarButton.onclick = () => window.location.reload();
        areaJuego.appendChild(recargarButton);
    }
    mostrarErrores();
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

function actualizarTiempo() {
    const tiempoDiv = document.getElementById('tiempo');
    const tiempoActual = Date.now() - tiempoInicio;
    const minutos = Math.floor(tiempoActual / 60000);
    const segundos = Math.floor((tiempoActual % 60000) / 1000);
    const milisegundos = Math.floor((tiempoActual % 1000) / 10).toString().padStart(2, '0');
    tiempoDiv.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}:${milisegundos}`;
}

// Función para mostrar diálogos del jefe final
function mostrarDialogoJefe(evento) {
    const dialogoDiv = document.getElementById('dialogo-jefe') || document.createElement('div');
    dialogoDiv.id = 'dialogo-jefe';
    dialogoDiv.style.position = 'absolute';
    dialogoDiv.style.bottom = '20px';
    dialogoDiv.style.left = '50%';
    dialogoDiv.style.transform = 'translateX(-50%)';
    dialogoDiv.style.color = 'white';
    dialogoDiv.style.fontSize = '1.5em';
    dialogoDiv.style.textAlign = 'center';
    dialogoDiv.style.padding = '10px';
    dialogoDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    dialogoDiv.style.borderRadius = '5px';
    dialogoDiv.style.zIndex = '1000';

    let dialogo = '';
    switch (evento) {
        case 'inicio':
            dialogo = "¡Alden! ¿Crees que ese corazón de juguete te hará mi igual? Yo soy la oscuridad que devora mundos.";
            break;
        case 'recibirDanio':
            dialogo = "¡Ja! Tus golpes son como pétalos al viento. ¿Así quieres salvar a tu amada?";
            break;
        case 'errorDerivada':
            dialogo = "¡Patético! Las matemáticas son el lenguaje del poder, y tú... solo balbuceas.";
            break;
        case 'mitadBatalla':
            dialogo = "Lyra ya no te reconoce. Para ella, solo soy yo... su único rey.";
            break;
        case 'bajoVida':
            dialogo = "¡No! ¡Mi oscuridad es eterna! ¡No puedes robarme mi trono!";
            break;
        case 'corregirCalculo':
            dialogo = "¡Maldita sea! ¿Quién te enseñó esos trucos? ¿El anciano? ¡Él también cayó!";
            break;
        case 'golpeFinal':
            dialogo = "Imposible... ¡Yo soy la— (tose sangre) ...sombra que nunca muere!";
            break;
        case 'derrotado':
            dialogo = "¡No... esto no termina aquí! Alden, tú... (su cuerpo se disuelve en humo) ...serás el próximo príncipe.";
            break;
        case 'perder':
            dialogo = "Mira a Lyra a los ojos mientras te rompo. ¡Que ella recuerde tu fracaso por siempre!, ¡Ja ja ja! Tu corazón es mío ahora. Lyra será mi reina, y tú... solo polvo bajo mis pies.";
            break;
    }

    dialogoDiv.textContent = dialogo;
    document.body.appendChild(dialogoDiv);

    // Eliminar el diálogo después de 5 segundos
    setTimeout(() => {
        dialogoDiv.textContent = '';
    }, 5000);
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
        maldicionesDiv.style.color = 'red';
        maldicionesDiv.style.fontSize = '1.2em';
        maldicionesDiv.style.position = 'fixed';
        maldicionesDiv.style.bottom = '20px';
        maldicionesDiv.style.left = '50%';
        maldicionesDiv.style.transform = 'translateX(-50%)';
        maldicionesDiv.style.textAlign = 'center';
        maldicionesDiv.style.width = '80%';
        maldicionesDiv.style.padding = '10px';
        maldicionesDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        maldicionesDiv.style.borderRadius = '5px';
        maldicionesDiv.style.zIndex = '1000';
        document.body.appendChild(maldicionesDiv);
    }

    if (!document.getElementById('corrupcion')) {
        const corrupcionDiv = document.createElement('div');
        corrupcionDiv.id = 'corrupcion';
        corrupcionDiv.style.color = 'purple';
        corrupcionDiv.style.fontSize = '1.2em';
        corrupcionDiv.style.position = 'absolute';
        corrupcionDiv.style.top = '140px';
        corrupcionDiv.style.left = '10px';
        corrupcionDiv.textContent = 'Corrupción: 0%';
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

    // Crear elemento para mostrar el puntaje
    const puntajeDiv = document.createElement('div');
    puntajeDiv.id = 'puntaje';
    puntajeDiv.style.color = 'gold';
    puntajeDiv.style.fontSize = '1.2em';
    puntajeDiv.style.position = 'absolute';
    puntajeDiv.style.top = '110px';
    puntajeDiv.style.left = '10px';
    puntajeDiv.textContent = `Puntaje: ${puntaje}`;
    document.body.appendChild(puntajeDiv);

    // Crear elemento para mostrar el tiempo con el nuevo estilo
    const tiempoDiv = document.createElement('div');
    tiempoDiv.id = 'tiempo';
    tiempoDiv.style.fontFamily = 'DS-Digital, monospace';
    tiempoDiv.style.fontSize = '2.5em';
    tiempoDiv.style.position = 'absolute';
    tiempoDiv.style.top = '10px';
    tiempoDiv.style.right = '10px';
    tiempoDiv.style.color = '#00ff00';
    tiempoDiv.style.textShadow = '0 0 10px #00ff00';
    tiempoDiv.style.backgroundColor = '#000';
    tiempoDiv.style.padding = '5px 15px';
    tiempoDiv.style.borderRadius = '5px';
    tiempoDiv.style.border = '2px solid #00ff00';
    tiempoDiv.style.letterSpacing = '2px';
    tiempoDiv.textContent = '00:00:00';
    document.body.appendChild(tiempoDiv);

    actualizarBarras();
}; 