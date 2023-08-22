const getCartById = (cartId) => {
    const cartIdOK = 2;

    if(!cartId) {
        return "No se ha proporcionado un id";
    }

    if (typeof cartId !== 'number') {
        return 'Tipo de dato incorrecto';
    }

    if (cartId !== cartIdOK){
        return 'Carrito no encontrado';
    }

    if(cartId === cartIdOK) {
        return "Carrito obtenido correctamente"
    }
}

let testPasados = 0;
let testTotales = 4;

console.log("Test de la función getCartById");
console.log('----------------------------------------------------------------');
console.log(
    'Test 1: La función debe devolver < No se ha proporcionado un id >'
);
const result1 = getCartById('');
if (result1 === 'No se ha proporcionado un id') {
    console.log('Test 1: Pasado');
    testPasados++;
} else {
    console.error(
     '* Test 1 fails: se esperaba < No se ha proporcionado un id > y se obtuvo',
     result1
);
}

console.log('----------------------------------------------------------------');
console.log('Test 2: La función debe devolver < Tipo de dato incorrecto >');
const result2 = getCartById('1');
if (result2 === 'Tipo de dato incorrecto') {
 console.log('Test 2: Pasado');
 testPasados++;
} else {
 console.error(
  '* Test 2 fails: se esperaba < Tipo de dato incorrecto > y se obtuvo',
  result2
 );
}

console.log('----------------------------------------------------------------');
console.log('Test 3: La función debe devolver < Carrito no encontrado >');
const result3 = getCartById(1);
if (result3 === 'Carrito no encontrado') {
 console.log('Test 3: Pasado');
 testPasados++;
} else {
 console.error(
  '* Test 3 fails: se esperaba < Carrito no encontrado > y se obtuvo',
  result3
 );
}

console.log('----------------------------------------------------------------');
console.log('Test 4: La función debe devolver < Carrito obtenido correctamente >');
const result4 = getCartById(2);
if (result4 === 'Carrito obtenido correctamente') {
 console.log('Test 4: Pasado');
 testPasados++;
} else {
 console.error(
  '* Test 4 fails: se esperaba < Carrito obtenido correctamente > y se obtuvo',
  result3
 );
}

console.log('_____________________________________________________________________________')

if (testPasados === testTotales) {
    console.log(
   `${testPasados} de ${testTotales} test superados con éxito.`
    );
} else {
    console.log(
   `${testTotales - testPasados} de ${testTotales} test fallaron`
    );
}