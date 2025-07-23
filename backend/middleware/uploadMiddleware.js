import multer from 'multer';

const storage=multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads/')
    },
    filename:(req,file,cb) =>{
        cb(null, `${Date.now()}- ${file.originalname}`)
    },
});

//File filter 
const fileFilter = (req,file,cb) =>{
    const alllowedTypes= ["image/jpeg","image/png","image/jpg"];
    if(alllowedTypes.includes(file.mimetype)){
        cb(null, true)
    }
    else{
        cb( new Error("Only .jpeg, .jpg , .png are allowed formats"),false)
    }
}

const upload= multer({storage,fileFilter})
export default upload;