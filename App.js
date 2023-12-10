const express=require('express');
const App = express();
const port = 3000;
const cors = require('cors')
const pacientes=require('./Routes/Pacientes');
App.use(cors());
App.use(express.json())
 App.use('/pacientes',pacientes);
 App.use('/*',(req,res) =>{ //la máscara con el asterísco será disparada si el interprete no encuentra la coincidencia con la ruta anterior   
    res.status(404).json({   
       message:'Incorrect route or params use paciente',   
   })   
})   
App.listen(port,() => {   
    console.log(`Servidor escuchando en http://localhost:${port}`)  
})