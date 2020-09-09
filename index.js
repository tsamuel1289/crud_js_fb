
const db = firebase.firestore(); //esto conecta a firestore

const taskform = document.getElementById('task-form'); //con esto llama por ID al formulario

const guardarTarea = (titulo, descripcion) => //se hace una funcion para utilizarlo en todos lados
    db.collection('tareas').doc().set({ //el await hace que se espere hasta que se tenga respuesta y se coloca cuando se ejecuta la funcion
        descripcion: descripcion
    })


taskform.addEventListener('submit', async (e)=> {     // entra el evento submit del boton y sale la funcion e, el async siempre va al inicio de la funcion
    e.preventDefault();    //evita que se vuelva a cargar la pagina
    
    const titulo = taskform['task-title'].value; //se ingresan los valores del titulo y descipcion en la constantes
    const descripcion = taskform['task-description'].value;

    await guardarTarea(titulo, descripcion);
    
    })