const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    if(req.headers.authorization) { 
        token = req.headers.authorization.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.JWTKEY);
            req.userData = decoded
            next();
        } catch (error) {
            return res.status(401)
                .json({
                    message: "Authentication Failed"
                })
        }
    } else {
        res.status(401)
            .json({
                message: "Authentication Failed",
                details: "Please authenticate and provide valid json"
            })
    }
}