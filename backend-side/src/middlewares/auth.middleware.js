import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if(!token){
            return res.status(401).json({
                status: 401,
                sucess: false,
                messagez: "Unauthorized"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRECT);

        req.user = decoded

        next()
    } catch (error) {
        return res.status(401).json({
            status: 401,
            success: false,
            message: "Invalid token",
        });
    }
}