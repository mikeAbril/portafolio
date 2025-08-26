document.addEventListener("DOMContentLoaded", ()=>{

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    axios.get("./lugares.json").then((res)=>{
        const data = res.data;
        const lugar = data.find((item)=> item.id == id);

          document.body.style.background = `linear-gradient(135deg, ${lugar.categoria.colorPrimario}, ${lugar.categoria.colorSecundario})`;

         
                const contenedor = document.createElement("div");
                contenedor.className = "contenido";

            
                const titulo = document.createElement("h1");
                titulo.textContent = lugar.nombre;

                const imagen = document.createElement("img");
                imagen.src = lugar.url_imagen;
                imagen.alt = lugar.nombre;

                let caja1 = document.createElement("div");
                caja1.className = "caja";

                const pais = document.createElement("h2");
                pais.textContent = `País: ${lugar.pais}`;
                const descripcion = document.createElement("h3");
                descripcion.textContent = `Descripcion: ${lugar.descripcion}`;

                 let caja2 = document.createElement("div");
                caja2.className = "caja";

                const coordenada1 = document.createElement("h3");
                coordenada1.textContent = `longuitud: ${lugar.coordenadas.latitud}`;
                
                const coordenada2 = document.createElement("h3");
                coordenada2.textContent = `longuitud: ${lugar.coordenadas.longitud}`;
             

 
                const botonVolver = document.createElement("button");
                botonVolver.textContent = "Volver al inicio";
                botonVolver.onclick = () => {
                    window.location.href = "index.html";  
                };

      
                contenedor.appendChild(titulo);
                contenedor.appendChild(imagen);
                contenedor.appendChild(caja1);
                contenedor.appendChild(caja2);
                caja1.appendChild(pais);
                caja1.appendChild(descripcion);
                caja2.appendChild(coordenada1);
                caja2.appendChild(coordenada2);

                
                contenedor.appendChild(botonVolver);

         
                document.body.appendChild(contenedor);
    })
    
})