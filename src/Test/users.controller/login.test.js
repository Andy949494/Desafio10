const login = (user, pass) => {
    const userOK = "user";
    const passOK = "password";

    if(!pass) {
        return "No se ha proporcionado un password";
    }

    if(!user) {
        return "No se ha proporcionado un usuario";
    }

    if(pass !== passOK){
        return "Contraseña incorrecta";
    }

    if(user !== userOK) {
        return "Usuario no encontrado";
    }

    if(user === userOK && pass === passOK) {
        return "Logueado"
    }
}

let testPasados = 0;
let testTotales = 5;


console.log("Test de la función login");
console.log("TEST 1: La funcion debe devolver: No se ha prorcionado un password");
let result = login("user", "");

if( result === "No se ha proporcionado un password") {
    console.log("Test 1: Pasado");
    testPasados++;
} else {
    console.error("* Test 1 fails: se esparaba No se ha prorcionado un password y se obtuvo: ", result);
}

console.log('----------------------------------------------------------------');
console.log("TEST 2: La funcion debe devolver: No se ha proporcionado un usuario");
result = login("", "password");

if( result === "No se ha proporcionado un usuario") {
    console.log("Test 2: Pasado");
    testPasados++;
} else {
    console.error("* Test 2 fails: se esparaba No se ha prorcionado un usuario y se obtuvo: ", result);
}

console.log('----------------------------------------------------------------');
console.log("TEST 3: La funcion debe devolver: Contraseña incorrecta");
result = login("user", "wrongPassword");

if( result === "Contraseña incorrecta") {
    console.log("Test 3: Pasado");
    testPasados++;
} else {
    console.error("* Test 3 fails: se esparaba Contraseña incorrecta y se obtuvo: ", result);
}

console.log('----------------------------------------------------------------');
console.log("TEST 4: La funcion debe devolver: Usuario no encontrado");
result = login("wrongUser", "password");

if( result === "Usuario no encontrado") {
    console.log("Test 4: Pasado");
    testPasados++;
} else {
    console.error("* Test 4 fails: se esparaba Usuario no encontrado y se obtuvo: ", result);
}

console.log('----------------------------------------------------------------');
console.log("TEST 5: La funcion debe devolver: Logueado");
result = login("user", "password");

if( result === "Logueado") {
    console.log("Test 5: Pasado");
    testPasados++;
} else {
    console.error("* Test 5 fails: se esparaba Logueado y se obtuvo: ", result);
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
