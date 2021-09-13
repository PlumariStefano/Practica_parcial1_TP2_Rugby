const fs = require('fs');
const archivo = (nombre, delimitador) => {
let data = fs.readFileSync(nombre, 'utf-8');
return data.split(delimitador);
};

const equipoA = archivo('rugby/equipo-A.txt', '\n');
const equipoB = archivo('rugby/equipo-B.txt', '\n');
const partido = archivo('rugby/partido.log', '\n');

const buscaJugador = (_apellido, equipo) => {
let e = false;
equipo.forEach(jugador => {
let apellido = jugador.split(' ');
if (apellido[1] === _apellido) {
  e = true;
}
});
return e;
};

const sumarPuntaje = (tipoAnotacion, puntosPorJugador) => {
let e = 0;

let puntos = (tipoAnotacion === "TRY") ? 5 : 2
e = puntos;
if (puntosPorJugador) {
  let puntosActu = puntosPorJugador
  e = puntos + puntosActu;
}
return e;
};

const puntosEquipo = (registro, equipo) => {
  const puntosPorJugador = {};
  registro.forEach(element => {
  let e = element.split(',');
  if(buscaJugador(e[0], equipo)) {
   if (puntosPorJugador[e[0]]) {
      puntosPorJugador[e[0]] = sumarPuntaje(e[1], puntosPorJugador[e[0]]);
   } else {
     puntosPorJugador[e[0]] = sumarPuntaje(e[1]);
    }
  }
  });
return puntosPorJugador;
}

const puntosEquipoA = puntosEquipo(partido, equipoA);
const puntosEquipoB = puntosEquipo(partido, equipoB);

console.log(puntosEquipoA);
console.log( puntosEquipoB);
const puntosB = () => {};

const resultadoFinal = (puntosEquipoA, puntosEquipoB) => { 
let TotalA=0;  
let TotalB=0; 

let grupoA= Object.entries(puntosEquipoA)
let grupoB= Object.entries(puntosEquipoB)

grupoA.forEach(Ga =>{
  TotalA+=Ga[1]
});

grupoB.forEach(Gb =>{
  TotalB+=Gb[1]
});
console.log("el partido termino Grupo A " + TotalA + " -  " + TotalB+" Grupo B")
};
const goleador = (puntosEquipoA, puntosEquipoB) => {
let grupoA= Object.entries(puntosEquipoA)
let grupoB= Object.entries(puntosEquipoB)

let goleador="";  
let puntosgoleador=0; 

grupoA.forEach(Ga =>{
  if(Ga[1]>puntosgoleador){
    puntosgoleador = Ga[1]
    goleador= Ga[0]
  }
});

grupoB.forEach(Gb =>{
  if(Gb[1]>puntosgoleador){
    puntosgoleador = Gb[1]
    goleador= Gb[0]
  }
});
console.log("el Goleador es " + goleador + " con " + puntosgoleador +" puntos")
};
const distribucionDePuntaje = (registro) => {
  let puntosTry=0
  let puntosConversion=0

  registro.forEach(element => {
    let e = element.split(",")
    if(e[1]==="TRY"){
      puntosTry+=5
    }else{
      puntosConversion+=2
    }
  });
  console.log("la division de anotaciones por tipo:")
  console.log(" TRY: " + puntosTry )
  console.log(" CONVERSION:  " + puntosConversion  )
};

resultadoFinal(puntosEquipoA, puntosEquipoB)
goleador(puntosEquipoA, puntosEquipoB)
distribucionDePuntaje(partido)



