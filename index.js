
const db = firebase.firestore(); //esto conecta a firestore


const taskContainer = document.getElementById('contenedorTareas');

//const traerTareas = () => db.collection('tareas').get(); //este metodo trae todo d ela coleccion "tareas"

const onGetTasks = (callback) => db.collection('tareas').onSnapshot(callback); //funcion de firebase para ejecutar cuando hay cambios

//FUNCION DE DELETE
const deleteTask = (id) => db.collection('tareas').doc(id).delete();

//PARA EDITAR
const getTask = (id) => db.collection('tareas').doc(id).get();





window.addEventListener('DOMContentLoaded', async (e) => { //esta funcion es para que cuando inice la venta se llame a la funcion "traerTareas"
   // const querySnapshot = await traerTareas(); //en querysnapshot se guarda todos los datos
   
   onGetTasks((querySnapshot) => {
        taskContainer.innerHTML = '';
        querySnapshot.forEach(doc => {

            const task = doc.data();

            taskContainer.innerHTML += `<div class="card card-body mt-2 morder-primary">
            <h3 class = "h5">${task.titulo}</h3>
            <p>${task.descripcion}</p>
                <div>
                    <button class="btn btn-primary btn-delete" data-id="${doc.id}" > Delete </button>
                    <button class="btn btn-secondary btn-edit" data-id="${doc.id}"> Editar </button>
                </div>
            </div> `

            //BOTON DELETE 
            const btnsDelete = document.querySelectorAll('.btn-delete');
            btnsDelete.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    
                    await deleteTask(e.target.dataset.id);
                })
            });
            //BOTON EDITAR
            const btnsEdit = document.querySelectorAll('.btn-edit');
            btnsEdit.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const doc = await getTask(e.target.dataset.id);
                    console.log(doc.data);
                    taskform['task-title'].value = "h";

                })
            })
        })

   })
   
})






const taskform = document.getElementById('task-form'); //con esto llama por ID al formulario

const guardarTarea = (titulo, descripcion) => //se hace una funcion para utilizarlo en todos lados
    db.collection('tareas').doc().set({ //el await hace que se espere hasta que se tenga respuesta y se coloca cuando se ejecuta la funcion
        titulo: titulo,
        descripcion: descripcion
    })

taskform.addEventListener('submit', async (e)=> {     // entra el evento submit del boton y sale la funcion e, el async siempre va al inicio de la funcion
    e.preventDefault();    //evita que se vuelva a cargar la pagina
    
    const titulo = taskform['task-title']; //se ingresan los valores del titulo y descipcion en la constantes
    const descripcion = taskform['task-description'];

    await guardarTarea(titulo.value , descripcion.value);
    

    taskform.reset(); //para que se vuelva blanco el formulario
    titulo.focus(); //para que se posicione el cursor en el titulo
    })