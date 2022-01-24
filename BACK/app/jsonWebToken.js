// module.exports = { 

//     authentification: async (req, res, next) => {
//     const { mail /*, password*/ } = req.body;

//     try {
//         let user = await User.findByMail(mail);

//         if (user) {
//             //bcrypt.compare(password, user.password, function(err, response) {
//                 //if (err) {
//                     //throw new Error(err);
//                 //}
//                 // if (response) {
//                     // delete user.password;

//                     const expireIn = 24 * 60 * 60;
//                     const token    = jwt.sign({
//                         user: user
//                     },
//                     SECRET_KEY,
//                     {
//                         expiresIn: expireIn
//                     });

//                     res.header('Authorization', 'Bearer ' + token);

//                     return res.status(200).json('auth_ok');
//                 // }

//                 // return res.status(403).json('wrong_credentials');
//             //});
//         } else {
//             return res.status(404).json('user_not_found');
//         }
//     } catch (error) {
//         return res.status(501).json(error);
//     }
// }

// }



const jwt = require('./services/jwt');

module.exports = (request, response, next) => {
    try {
        let token = request.headers['authorization'];
        console.log(token);
        if (!token) {
            return response.status(401).json('Invalid token');
        }
        const payload = jwt.validateToken(token);
        console.log(payload);
        if (!payload.data) {
            return response.status(401).json('Invalid token');
        }
        request.userId = payload.data;
        next();
    } catch(error) {
        console.log(error);
        response.status(401).json(error.message);
    }
}