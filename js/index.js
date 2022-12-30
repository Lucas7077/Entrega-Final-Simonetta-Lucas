const productos = [
    //Abrigos
    {
        id: "abrigo-1",
        titulo: "Abrigo 1",
        imagen: "./img/img abrigo 1.jpg",
        categoria: {
            nombre:"Abrigos",
            id: "abrigos"
        },
        precio: 10000
    },
    {
        id: "abrigo-2",
        titulo: "Abrigo 2",
        imagen: "./img/img abrigo 2.jpg",
        categoria: {
            nombre:"Abrigos",
            id: "abrigos"
        },
        precio: 10000
    },
    {
        id: "abrigo-3",
        titulo: "Abrigo 3",
        imagen: "./img/img abrigo 3.jpg",
        categoria: {
            nombre:"Abrigos",
            id: "abrigos"
        },
        precio: 10000
    },
    {
        id: "abrigo-4",
        titulo: "Abrigo 4",
        imagen: "./img/img abrigo 4.jpg",
        categoria: {
            nombre:"Abrigos",
            id: "abrigos"
        },
        precio: 10000
    },
    //pantalones
    {
        id: "pantalon-1",
        titulo: "Pantalon 1",
        imagen: "./img/img pantalon 1.jpg",
        categoria: {
            nombre:"Pantalones",
            id: "pantalones"
        },
        precio: 9000
    },
    {
        id: "pantalon-2",
        titulo: "Pantalon 2",
        imagen: "./img/img pantalon 2.jpg",
        categoria: {
            nombre:"Pantalones",
            id: "pantalones"
        },
        precio: 9000
    },
    {
        id: "pantalon-3",
        titulo: "Pantalon 3",
        imagen: "./img/img pantalon 3.jpg",
        categoria: {
            nombre:"Pantalones",
            id: "pantalones"
        },
        precio: 9000
    },
    {
        id: "pantalon-4",
        titulo: "Pantalon 4",
        imagen: "./img/img pantalon 4.jpg",
        categoria: {
            nombre:"Pantalones",
            id: "pantalones"
        },
        precio: 9000
    },
    {
        id: "pantalon-5",
        titulo: "Pantalon 5",
        imagen: "./img/img pantalon 5.jpg",
        categoria: {
            nombre:"Pantalones",
            id: "pantalones"
        },
        precio: 9000
    },
    //Remeras
    {
        id: "remera-1",
        titulo: "Remera 1",
        imagen: "./img/img remera 1.jpg",
        categoria: {
            nombre:"Remeras",
            id: "remeras"
        },
        precio: 4800
    },
    {
        id: "remera-2",
        titulo: "Remera 2",
        imagen: "./img/img remera 2.jpg",
        categoria: {
            nombre:"Remeras",
            id: "remeras"
        },
        precio: 4800
    },
    {
        id: "remera-3",
        titulo: "Remera 3",
        imagen: "./img/img remera 3.jpg",
        categoria: {
            nombre:"Remeras",
            id: "remeras"
        },
        precio: 4800
    },
    {
        id: "remera-4",
        titulo: "Remera 4",
        imagen: "./img/img remera 4.jpg",
        categoria: {
            nombre:"Remeras",
            id: "remeras"
        },
        precio: 4800
    },
    {
        id: "remera-5",
        titulo: "Remera 5",
        imagen: "./img/img remera 5.jpg",
        categoria: {
            nombre:"Remeras",
            id: "remeras"
        },
        precio: 4800
    },
    {
        id: "remera-6",
        titulo: "Remera 6",
        imagen: "./img/img remera 6.jpg",
        categoria: {
            nombre:"Remeras",
            id: "remeras"
        },
        precio: 4800
    }
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}