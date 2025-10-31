import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";

const __dirname = path.resolve();

// Usamos multer para manejar la subida de archivos ya que los archivos van a venir en formato multipart/form-data desde el frontend

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // TODO: Validar que el archivo exista
    // if (!file) {
    //   cb(new Error("No se ha proporcionado ningún archivo"), null);
    //   return;
    // }

    console.log(req.path);
    
    if(req.path.includes("products")) {
      // Crear la carpeta si no existe
      


      if(!fs.existsSync(path.join(__dirname, "public/images/products"))) {
        fs.mkdirSync(path.join(__dirname, "public/images/products"), { recursive: true });
      }

      // Definir la carpeta de destino para productos

      cb(null, path.join(__dirname, "public/images/products"));
    }

    if(req.path.includes("users")) {
      // Definir la carpeta de destino para usuarios
      cb(null, path.join(__dirname, "public/images/users"));
    }
  },
  filename: (req, file, cb) => {
    console.log(file);
    // Generamos un sufijo único para evitar colisiones de nombres
    const uniqueName = crypto.randomBytes(16).toString("hex");

    cb(null, uniqueName + path.extname(file.originalname));
  },
  
})

const multerUploadImage = multer({ storage: storage })

// !Es sumamente importante exportar el middleware configurado para usarlo en las rutas, tenemos que asegurar que en la request el archivo venga con el nombre "image"
const uploadImage = multerUploadImage.single("image");

export default uploadImage;
