import anuncio_auto from "./anuncio_auto.js" 
let anuncios=JSON.parse(localStorage.getItem("lista")) || [];


window.addEventListener("DOMContentLoaded",()=>{
    //document.forms[0].addEventListener("submit",handlerSubmit);
     //const boton = document.getElementById('btnLista');
    // if(anuncios.length==0)
    // {
    //     divBotones.
    // }
    document.addEventListener("click",handlerClick);
 //console.log(document);
   // boton.addEventListener('click',handlerLoadList);    
    if(anuncios.length>0)
    {
        handlerLoadList(anuncios);
    }
 });
 
 function handlerSubmit(e){
    e.preventDefault();
    let frm=document.forms[0];
   
    const nuevoAnuncio= new anuncio_auto(Date.now(),frm.titulo.value,frm.transaccion.value,frm.descripcion.value,frm.precio.value,frm.puertas.value,frm.kilometros.value,frm.potencia.value);
    
    anuncios.push(nuevoAnuncio) ;
    if(anuncios.length>0)
    {
        AgregarSpinner();
        setTimeout(()=>{
            altaAnuncio(nuevoAnuncio);
            handlerLoadList(nuevoAnuncio);
            EliminarSpinner();
        },2000);  
    }
    LimpiarFormulario(frm);

}

function AgregarSpinner()
{
    let spinner=document.createElement('img');
    spinner.setAttribute("src","./assets/Gear-0.2s-200px.gif");
    spinner.setAttribute("alt","spinner imagen");
    document.getElementById('spinner-container').appendChild(spinner);
}
function EliminarSpinner()
{
    document.getElementById('spinner-container').removeChild(document.getElementById('spinner-container').firstElementChild);
}
function almacenarData(data){
    localStorage.setItem("lista",JSON.stringify(data));
    handlerLoadList();
}

function leeData()
{
    anuncios= JSON.parse(localStorage.getItem("lista"));
}

function LimpiarFormulario(frm)
{
    frm.reset();   
    // document.getElementById('TituloFormulario').textContent="Formulario de alta de anuncio";
     document.getElementById('Submit').removeAttribute("class","oculto");
     document.getElementById('Submit').setAttribute("class", "button button1");
    // const submit = document.querySelector("#Submit");
    // submit.classList.toggle("mostrar");
    document.forms[0].id.value ='';
}

function altaAnuncio(p)
{
   // anuncios.push(p);
    almacenarData(anuncios);
    //handlerLoadList();
}
function handlerLoadList(e)
{
    RenderizarLista(CrearTabla(anuncios),document.getElementById('divTabla'));
}
function handlerDeleteList(e)
{
    RenderizarLista(null,document.getElementById('divTabla'));  
}
function RenderizarLista(lista,contenedor)
{
    while(contenedor.hasChildNodes())
    {
        contenedor.removeChild(contenedor.firstChild);
    }
    if(lista)
    {  
       contenedor.appendChild(lista);
    }
}

function CrearTabla(items)
{
    const Tabla= document.createElement('table');
    Tabla.append(crearThead(items[0]));
    Tabla.appendChild(CrearTbody(items));
    return Tabla;
}
function crearThead(item)
{
    const Thead=document.createElement('thead');
    const Tr=document.createElement('tr');
 
   for (const key in item) {
    if(key==="id")
    {
        Tr.setAttribute("data-id",key);
    }
    else{
    const th=document.createElement('th');
    const texto= document.createTextNode(key);
    th.appendChild(texto);
    Tr.appendChild(th);
    }
   }
   Thead.appendChild(Tr);
    return Thead;
}
function CrearTbody(items)
{
    const Tbody=document.createElement('tbody');
    
    items.forEach(element => {
        const Tr=document.createElement('tr');
        for (const key in element) 
        {
            if(key==="id")
            {
                Tr.setAttribute("data-id",element[key]);
            }
            else{
                const td=document.createElement('td');
                const contenido= document.createTextNode(element[key]);
                td.appendChild(contenido);
                Tr.appendChild(td);
            }
        }
        Tbody.appendChild(Tr);
    });
    return Tbody;
}

function ModificarDatosAnuncio()
{
     document.getElementById('Submit').setAttribute("class", "oculto");
    
     let frm=document.forms[0];
    
     const AnuncioEditado= new anuncio_auto(parseInt(frm.id.value),frm.titulo.value,frm.transaccion.value,frm.descripcion.value,frm.precio.value,frm.puertas.value,frm.kilometros.value,frm.potencia.value);
    
    if(confirm("confirma modificacion?"))
    {
        let index=anuncios.findIndex((el)=>{
         return el.id== AnuncioEditado.id;
     });
    AgregarSpinner();
    
    setTimeout(()=>{
        anuncios.splice(index,1,AnuncioEditado); 
        almacenarData(anuncios);    
        EliminarSpinner();
    },2000);
     
    }
    
    LimpiarFormulario(frm);
}
function EliminarDatosAnuncio(e)
{

}
function Cargarformulario(id)
{ 
    const {titulo,transaccion,descripcion,precio,puertas,kilometros,potencia} = anuncios.filter(a=>a.id===parseInt(id))[0];
    const frm=document.forms[0];
    frm.titulo.value=titulo;
    frm.descripcion.value=descripcion;
    frm.transaccion.value=transaccion;
    frm.precio.value=precio;
    frm.puertas.value=puertas;
    frm.kilometros.value=kilometros
    frm.potencia.value=potencia;
    frm.id.value= id; 
    document.getElementById('Submit').setAttribute("class", "oculto");
   // document.getElementById('TituloFormulario').textContent="Modificacion de datos de anuncio";
}
function handlerClick(e)
{
    //console.log(e);
   if(e.target.matches("#btnModificar"))
   {
    if(document.forms[0].id.value != '')
    {
        ModificarDatosAnuncio();
       console.log("hiciste click en el boton Modificar");
    }
   }
   if(e.target.matches("#Submit"))
   {
        handlerSubmit(e);
   }
   if(e.target.matches("#btnEliminar"))
   {
       console.log("hiciste click en el boton Eliminar");
      let id= parseInt(document.forms[0].id.value);
      if(document.forms[0].id.value != '')
      {
        if(confirm("confirma Eliminacion?"))
        {
            AgregarSpinner();
            setTimeout(()=>{
            anuncios=anuncios.filter(a=>a.id!==parseInt(id));
            almacenarData(anuncios);
        
            EliminarSpinner();
        },2000);
           
            //si esta declarado como const no puedo usar filter y sobreescribir,  tengo que 
            //let index=anuncios.findIndex((el)=>el.id== id);
            //anuncios.splice(index,1);
        }
        LimpiarFormulario(document.forms[0]);
      }
      
      else{
        LimpiarFormulario(document.forms[0]);
      }
   }
   if(e.target.matches("#btnCancelar"))
   {
       //console.log("hiciste click en el boton Cancelar");
       LimpiarFormulario(document.forms[0]);
   }
   if(e.target.matches("td"))
   {
        let id=e.target.parentNode.dataset.id;
        Cargarformulario(id);
        
        //ModificarDatosAnuncio(e);
        console.log(id);
   }
}