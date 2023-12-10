const express = require('express'); 
const App = express(); 


const pacientes =  [   
    { 
        DNI:'45907496W', 
        firstName:'Aida', 
        surname:'Fdz', 
        direction:'Volta Redonda', 
        localidad:'Aragon', 
        cp:'15822', 
        telf:'633878725' 
    },    

    { 
        DNI:'96456884R', 
         firstName:'Ana', 
         surname:'Gomez', 
         direction:'Avenida Alta', 
         localidad:'Ferrol', 
         cp:'16250', 
         telf:'633878725' 
        },    
    { 
        DNI:'82658947L', 
         firstName:'Antonio', 
         surname:'Gil', 
         direction:'Rua Novel', 
         localidad:'Touro', 
         cp:'10550', 
         telf:'633878725' 
        },    

    { 
        DNI:'29564836S', 
         firstName:'Jorge', 
         surname:'Vazquez', 
         direction:'Santiso', 
         localidad:'Madrid', 
         cp:'15512', 
         telf:'633878725' 
        },    ]//set de datos “hardcodeados” que simulan datos recibidos de una base de datos  

/* ---RUTAS--- */ 
// Dirección base endpoint 
App.get('/',(req,res) => {   
    res.status(200).json ({   
        message:pacientes           
    }) 
    //método get que devuelve los datos con un estado 200   
 //funciona como union del endpoint 
 })   

App.get('/:DNI',(req,res) => { 
    console.log('dia')
    res.set({'Set-Cookie': 'Test cookie'})  
    if(!req.params.DNI) {  
        return res.status(400).json({  
            message:'Incorrect query params'  
        })  
    }  

    const selectpacientes =pacientes.filter(elem => elem.DNI === req.params.DNI);  
    console.log(selectpacientes)  
    res.status(200).json({  
        message:'ok',  
        paciente:selectpacientes  
    })  
}) 

// POST: te mando información 

//subir un nuevo paciente 

App.post('/',(req,res) => {  
        res.set({'Set-Cookie': 'Test cookie'}) 
        if(!req.body) {  
            return res.status(400).json({message:'DNI data mandatory'  
        })  
        }   
          // Obten la información recibida en la request y guardala en /paciente 
        if(req.body.DNI.length > 1) {

        pacientes.push(req.body);  
        return res.status(200).json({  
            message:'ok',  
            paciente:pacientes[pacientes.length -1]  
        })  }
        return res.status(400).json({message:'DNI data mandatory'})
    })  
    //metodo put para actualizar datos según el dni 
    App.put('/:DNI',(req,res) => {  
        console.log('hola');
        res.set({'Set-Cookie': 'Test cookie'}) 
       
        if(!req.body || !req.params.DNI) {  
            return res.status(400).json({  
                message:'paciente o DNI param mandatory'  
            })  
        }  
        const pacientesIndex = pacientes.findIndex(elem =>{  
             return elem.DNI === req.params.DNI;  
            }) 
        if (pacientesIndex < 0) {  
            return res.status(404).json({  
                message:'No se encontro ningun DNI con este numero'  
            })  
        }  

        for(const property in req.body) {  
            console.log(property);  
            pacientes[pacientesIndex][property] = req.body[property]  
        }  
        res.status(200).json({  
            message:'ok', 
            pacientes:pacientes[pacientesIndex]  
        })  
    })  

    App.delete('/:DNI',(req,res) => {
        console.log('pex') 
        res.set({'Set-Cookie': 'Test cookie'});  
        if(!req.params.DNI){  
            return res.status(400).json({  
                message:'DNI param mandatory'  
            })  
        } 
        const pacientesIndex = pacientes.findIndex(elem =>{  
            return elem.DNI === req.params.DNI;  
       })  
       if (pacientesIndex < 0) {  
           return res.status(404).json({  
               message:'No se encontro ningun DNI con este numero'  
           })  
       }  
       const deletedpacientes = pacientes.splice(pacientesIndex,1);  
       res.status(200).json({  
        message:'ok',  
        deletedpacientes  
       })  
    })  

module.exports = App;