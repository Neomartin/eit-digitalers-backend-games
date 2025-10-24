import jwt from "jsonwebtoken";
// Middleware para verificar si el usuario está autenticado
export function isAuth(req, res, next) {
  const SECRET = process.env.JWT_SECRET;

  const token = req.headers.authorization; // Obtener el token del encabezado Authorization

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decodedToken;

    next(); // Continuar al siguiente middleware o controlador
  });
}

// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...............Eg_JuI";
//  const token = req.headers.authorization.split(" ")[1]; // Obtener el token del encabezado Authorization
