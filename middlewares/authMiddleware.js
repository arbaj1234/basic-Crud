import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        // Get the token from the headers
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Access denied. No token provided.",
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Save the decoded user info in the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        res.status(401).send({
            success: false,
            message: "Invalid or expired token",
            error: error.message,
        });
    }
};
