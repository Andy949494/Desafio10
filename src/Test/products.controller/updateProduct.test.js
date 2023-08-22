const updateProduct = (productId,replace) => {
    const productIdOK = 2;

    if(!productId) {
        return "No se ha proporcionado un id";
    }

    if (typeof productId !== 'number') {
        return 'Tipo de dato incorrecto';
    }

    if (productId !== productIdOK){
        return 'Producto no encontrado';
    }
    
    if(productId === productIdOK && replace) {
        return "Producto actualizado correctamente"
    }
}

let testPasados = 0;
let testTotales = 4;

console.log("Test de la función updateProduct");
console.log('----------------------------------------------------------------');
console.log(
    'Test 1: La función debe devolver < No se ha proporcionado un id >'
);
const result1 = updateProduct('','replace');
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
const result2 = updateProduct('1','repalce');
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
console.log('Test 3: La función debe devolver < Producto no encontrado >');
const result3 = updateProduct(1,'reaplce');
if (result3 === 'Producto no encontrado') {
 console.log('Test 3: Pasado');
 testPasados++;
} else {
 console.error(
  '* Test 3 fails: se esperaba < Producto no encontrado > y se obtuvo',
  result3
 );
}

console.log('----------------------------------------------------------------');
console.log('Test 4: La función debe devolver < Producto actualizado correctamente >');
const result4 = updateProduct(2,'replace');
if (result4 === 'Producto actualizado correctamente') {
 console.log('Test 4: Pasado');
 testPasados++;
} else {
 console.error(
  '* Test 4 fails: se esperaba < Producto actualizado correctamente > y se obtuvo',
  result4
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