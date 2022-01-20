const jwt = require('jsonwebtoken');

module.exports = (config) => {
    const log = config.log();

    function authorization(req, res, next) {
        const token = req.headers["Authorization"];
            if (!token)
                return res.status(401).json({
                    token: null,
                    auth: false,
                    message: 'No token provided'
                });
            
            jwt.verify(token, config.SECRET, (err, decoded) => {
                if (err)
                    return res.status(500).json({
                        auth: false,
                        message: 'Failed to authenticate token'
                    });
                
                req.user = decoded.id;
                next();
            });
    }

    return {authorization}
}