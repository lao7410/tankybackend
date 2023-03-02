const multer = require('multer')


// destino archivos nombre
/*  */
const storage = multer.diskStorage({
    destination:  function(req, file, cb) {
        cb(null, `${__dirname}/public/uploads`)
    },
    filename: function(req, file, cb) {
        console.log('file: ',file)
        cb(null, `${Date.now()}-${file.originalname}`)        
    }
})

/* The above code is creating a multer object that will be used to upload files to the server. */
const uploader = multer({ 
    storage, 
    onError: function(err,next){
        console.log(err)
        next()
    }
})

module.exports = { uploader }
