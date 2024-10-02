const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Obtener el token del encabezado Authorization
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extraer el token después de "Bearer "

    // Verificar si no hay token
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }

    try {
        // Verificar el token usando el secret
        const decoded = jwt.verify(token, 'miSecretoJWT'); // Asegúrate de usar la misma clave secreta
        req.user = decoded; // Adjuntar los datos del usuario decodificados al objeto req
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token no válido.' });
    }
};

module.exports = authMiddleware;
