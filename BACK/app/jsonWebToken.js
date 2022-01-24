const jwt = require('./services/jwt');

module.exports = (request, response, next) => {
    try {
        let bearerToken = request.headers['authorization'];
        console.log(bearerToken);
        let length = bearerToken.length;
        let token = bearerToken.substr(7, length);
        if (!token) {
            return response.status(401).json('Invalid token');
        }
        const payload = jwt.validateToken(token);
        console.log(payload);
        if (!payload.data) {
            return response.status(401).json('Invalid token');
        }
        request.user = payload.data;
        
        next();
    } catch (error) {
        console.log(error);
        response.status(401).json(error.message);
    }
}