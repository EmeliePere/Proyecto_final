const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const precioBase = 2000;

function calcularRecargoEdad(edad) {
  if (edad >= 18 && edad <= 24) return precioBase * 0.10;
  if (edad >= 25 && edad <= 49) return precioBase * 0.20;
  if (edad >= 50) return precioBase * 0.30;
  return 0;
}

function cotizar() {
  rl.question("Ingrese la edad del asegurado: ", function(edadStr) {
    const edad = parseInt(edadStr);
    if (edad < 18) {
      console.log("El asegurado debe ser mayor de edad.");
      rl.close();
      return;
    }

    let total = precioBase;
    total += calcularRecargoEdad(edad);

    rl.question("¿Está casado? (si/no): ", function(casado) {
      if (casado.toLowerCase() === "si") {
        rl.question("Ingrese la edad del cónyuge: ", function(edadConyugeStr) {
          const edadConyuge = parseInt(edadConyugeStr);
          total += calcularRecargoEdad(edadConyuge);

          rl.question("Ingrese la cantidad de hijos: ", function(hijosStr) {
            const hijos = parseInt(hijosStr);
            total += hijos * (precioBase * 0.20);

            console.log(`El precio total de la cotización es: Q${total.toFixed(2)}`);
            rl.close();
          });
        });
      } else {
        rl.question("Ingrese la cantidad de hijos: ", function(hijosStr) {
          const hijos = parseInt(hijosStr);
          total += hijos * (precioBase * 0.20);

          console.log(`El precio total de la cotización es: Q${total.toFixed(2)}`);
          rl.close();
        });
      }
    });
  });
}

cotizar();
