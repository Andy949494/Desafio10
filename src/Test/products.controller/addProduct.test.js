const addProduct = (title,description,code,price,status,stock,category) => {
    
    if(!title) {
        return "No se ha proporcionado un título";
    }
    
    if(!description) {
        return "No se ha proporcionado una descripción";
    }

    if(!code) {
        return "No se ha proporcionado un código";
    }

    if(!price) {
        return "No se ha proporcionado un precio";
    }

    if(!status) {
        return "No se ha proporcionado un estado";
    }

    if(!stock) {
        return "No se ha proporcionado un stock";
    }

    if(!category) {
        return "No se ha proporcionado una categoría";
    }

    return 'Producto agregado correctamente';
}

let testPasados = 0;
let testTotales = 7;

console.log("Test de la función addProduct");
console.log('----------------------------------------------------------------');
console.log("TEST 1: La funcion debe devolver: No se ha proporcionado un título");
const result1 = addProduct('','description','code','price','status','stock','category');
if( result1 === "No se ha proporcionado un título") {
    console.log("Test 1: Pasado");
    testPasados++;
} else {
    console.error("* Test 1 fails: se esparaba No se ha proporcionado un título y se obtuvo: ", result1);
}

console.log('----------------------------------------------------------------');

console.log("TEST 2: La funcion debe devolver: No se ha proporcionado una descripción");
const result2 = addProduct('title','','code','price','status','stock','category');
if( result2 === "No se ha proporcionado una descripción") {
    console.log("Test 2: Pasado");
    testPasados++;
} else {
    console.error("* Test 1 fails: se esparaba No se ha proporcionado una descripción y se obtuvo: ", result2);
}

console.log('----------------------------------------------------------------');

console.log("TEST 3: La funcion debe devolver: No se ha proporcionado un código");
const result3 = addProduct('title','description','','price','status','stock','category');
if( result3 === "No se ha proporcionado un código") {
    console.log("Test 3: Pasado");
    testPasados++;
} else {
    console.error("* Test 1 fails: se esparaba No se ha proporcionado un código y se obtuvo: ", result3);
}

console.log('----------------------------------------------------------------');

console.log("TEST 4: La funcion debe devolver: No se ha proporcionado un precio");
const result4 = addProduct('title','description','code','','status','stock','category');
if( result4 === "No se ha proporcionado un precio") {
    console.log("Test 4: Pasado");
    testPasados++;
} else {
    console.error("* Test 1 fails: se esparaba No se ha proporcionado un precio y se obtuvo: ", result4);
}
console.log('----------------------------------------------------------------');

console.log("TEST 5: La funcion debe devolver: No se ha proporcionado un estado");
const result5 = addProduct('title','description','code','precio','','stock','category');
if( result5 === "No se ha proporcionado un estado") {
    console.log("Test 5: Pasado");
    testPasados++;
} else {
    console.error("* Test 1 fails: se esparaba No se ha proporcionado un estado y se obtuvo: ", result5);
}

console.log('----------------------------------------------------------------');

console.log("TEST 6: La funcion debe devolver: No se ha proporcionado un stock");
const result6 = addProduct('title','description','code','precio','status','','category');
if( result6 === "No se ha proporcionado un stock") {
    console.log("Test 6: Pasado");
    testPasados++;
} else {
    console.error("* Test 1 fails: se esparaba No se ha proporcionado un stock y se obtuvo: ", result6);
}

console.log('----------------------------------------------------------------');

console.log("TEST 7: La funcion debe devolver: No se ha proporcionado una categoría");
const result7 = addProduct('title','description','code','precio','status','stock','');
if( result7 === "No se ha proporcionado una categoría") {
    console.log("Test 7: Pasado");
    testPasados++;
} else {
    console.error("* Test 1 fails: se esparaba No se ha proporcionado una categoría y se obtuvo: ", result7);
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