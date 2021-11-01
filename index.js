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
return  puntosPorJugador;
}

const puntosEquipoA = puntosEquipo(partido, equipoA);
const puntosEquipoB = puntosEquipo(partido, equipoB);

console.log(puntosEquipoA);
console.log( puntosEquipoB);
const puntosB = () => {};

const resultadoFinal = (puntosEquipoA, puntosEquipoB) => { 
  const resultadoFinal={
    TotalA:0,
    TotalB:0
  };
  let grupoA= Object.entries(puntosEquipoA)
  let grupoB= Object.entries(puntosEquipoB)

  grupoA.forEach(Ga =>{
    resultadoFinal.TotalA+=Ga[1]
    });

  grupoB.forEach(Gb =>{
    resultadoFinal.TotalB+=Gb[1]
  });
  //console.log("el partido termino Grupo A " + resultadoFinal.TotalA + " -  " + resultadoFinal.TotalB+" Grupo B")
  return JSON.stringify(resultadoFinal)
};
const goleador = (puntosEquipoA, puntosEquipoB) => {
  let grupoA= Object.entries(puntosEquipoA)
  let grupoB= Object.entries(puntosEquipoB)

  const goleador={
    nombre:"",
    puntos:0
  }

  grupoA.forEach(Ga =>{
    if(Ga[1]> goleador.puntos){
      goleador.puntos = Ga[1]
      goleador.nombre= Ga[0]
    }
  });

  grupoB.forEach(Gb =>{
    if(Gb[1]> goleador.puntos){
      goleador.puntos = Gb[1]
      goleador.nombre= Gb[0]
    }
  });
 // console.log("el Goleador es " + goleador.nombre + " con " + goleador.puntos +" puntos")

  return JSON.stringify(goleador)
};
const distribucionDePuntaje = (registro) => {
  const distribucionXtipo={
    puntosTry:0,
    puntosConversion:0
  }

  registro.forEach(element => {
    let e = element.split(",")
    if(e[1]==="TRY"){
      distribucionXtipo.puntosTry+=5
    }else{
      distribucionXtipo.puntosConversion+=2
    }
  });
 /* console.log("la division de anotaciones por tipo:")
  console.log(" TRY: " + distribucionXtipo.puntosTry )
  console.log(" CONVERSION:  " + distribucionXtipo.puntosConversion  )*/

  return JSON.stringify(distribucionXtipo)
};

console.log(resultadoFinal(puntosEquipoA, puntosEquipoB))
console.log(goleador(puntosEquipoA, puntosEquipoB))
console.log(distribucionDePuntaje(partido))



