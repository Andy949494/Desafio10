const addProductToCart = (cartId,productId,quantity) => {
    const cartIdOK = 2;
    const productIdOK = 3

    
    if(!cartId) {
        return "No se ha proporcionado un cart id";
    }

    if(!productId) {
        return "No se ha proporcionado un product id";
    }

    if (typeof cartId !== 'number' || typeof productId !== 'number' || typeof quantity !== 'number') {
        return 'Tipo de dato incorrecto';
    }

    if (cartId !== cartIdOK){
        return 'Carrito no encontrado';
    }

    if (productId !== productIdOK){
        return 'Producto no encontrado';
    }

    if(cartId === cartIdOK && productId === productIdOK && quantity) {
        return "Cantidad actualizada correctamente"
    }
}

let testPasados = 0;
let testTotales = 6;

console.log("Test de la función addProductToCart");

console.log('----------------------------------------------------------------');

console.log('Test 1: La función debe devolver < Tipo de dato incorrecto >');
const result1 = addProductToCart('1',3,10);
if (result1 === 'Tipo de dato incorrecto') {
 console.log('Test 1: Pasado');
 testPasados++;
} else {
 console.error(
  '* Test 1 fails: se esperaba < Tipo de dato incorrecto > y se obtuvo',
  result1
 );
}

console.log('----------------------------------------------------------------');

console.log(
    'Test 2: La función debe devolver < No se ha proporcionado un cart id >'
);
const result2 = addProductToCart('',3,10);
if (result2 === 'No se ha proporcionado un cart id') {
    console.log('Test 2: Pasado');
    testPasados++;
} else {
    console.error(
     '* Test 2 fails: se esperaba < No se ha proporcionado un cart id > y se obtuvo',
     result2
);
}

console.log('----------------------------------------------------------------');

console.log('Test 3: La función debe devolver < No se ha proporcionado un product id >');
const result3 = addProductToCart(2,'',10);
if (result3 === 'No se ha proporcionado un product id') {
    console.log('Test 3: Pasado');
    testPasados++;
} else {
    console.error(
     '* Test 3 fails: se esperaba < No se ha proporcionado un product id > y se obtuvo',
     result3
);
}

console.log('----------------------------------------------------------------');


console.log('Test 4: La función debe devolver < Carrito no encontrado >');
const result4 = addProductToCart(1,3,10);
if (result4 === 'Carrito no encontrado') {
 console.log('Test 4: Pasado');
 testPasados++;
} else {
 console.error(
  '* Test 4 fails: se esperaba < Carrito no encontrado > y se obtuvo',
  result4
 );
}

console.log('----------------------------------------------------------------');

console.log('Test 5: La función debe devolver < Producto no encontrado >');
const result5 = addProductToCart(2,4,10);
if (result5 === 'Producto no encontrado') {
 console.log('Test 5: Pasado');
 testPasados++;
} else {
 console.error(
  '* Test 5 fails: se esperaba < Producto no encontrado > y se obtuvo',
  result5
 );
}

console.log('----------------------------------------------------------------');

console.log('Test 6: La función debe devolver < Cantidad actualizada correctamente >');
const result6 = addProductToCart(2,3,10);
if (result6 === 'Cantidad actualizada correctamente') {
 console.log('Test 6: Pasado');
 testPasados++;
} else {
 console.error(
  '* Test 6 fails: se esperaba < Cantidad actualizada correctamente > y se obtuvo',
  result6
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