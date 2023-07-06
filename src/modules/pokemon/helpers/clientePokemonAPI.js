const obtenerPokemon = async () => {
    //retornar el array de pokemons
    //console.log("hola");

    await obtenerNombresPokemon(obtenerVectorNumerico())
    await consumirAPI(1)
    const vector = await obtenerNombresPokemon(obtenerVectorNumerico())
    console.log(vector)
    return vector
}

function getNumeroAleatorio(inicio, fin) {
    fin++
    return Math.floor(Math.random() * (fin - inicio) + inicio);
}

const obtenerVectorNumerico = () => {
    const vectorOp = []
    for (var i = 0; i < 4; i++) {
        vectorOp.push(getNumeroAleatorio(1, 600))
    }

    //const vector=[getNumeroAleatorio(1,600), getNumeroAleatorio(1,600),getNumeroAleatorio(1,600),getNumeroAleatorio(1,600)]
    return vectorOp;
}

const consumirAPI = async (id) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) => r.json())

    return data;
}

const obtenerNombresPokemon = async ([id1, id2, id3, id4] = []) => {
    const data1 = await consumirAPI(id1)
    const data2 = await consumirAPI(id2)
    const data3 = await consumirAPI(id3)
    const data4 = await consumirAPI(id4)


    const obj1 = {
        nombre: data1.name,
        id: data1.id
    };
    const obj2 = {
        nombre: data2.name,
        id: data2.id
    };
    const obj3 = {
        nombre: data3.name,
        id: data3.id
    };
    const obj4 = {
        nombre: data4.name,
        id: data4.id
    }

    const vectorObjetos = [obj1, obj2, obj3, obj4]
    return vectorObjetos
}
//OTRA ALTERNATIVA
/*const obtenerNombresPokemon2=(arreglo)=>{
    const id1= arreglo[0];
    const id2= arreglo[1];
}*/

const obtenerFachadaPokemon = async () => {
    return await obtenerPokemon();
}



export default obtenerFachadaPokemon;
