const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            const error = err.errors.forEach(el => { el.message })
            res.status(400).json({ message: error })
            break;
        case "EmailEmpty":
            res.status(400).json({ message: "Email is required" })
            break;
        case "PasswordEmpty":
            res.status(400).json({ message: "Password is required" })
            break;
        case "JsonWebTokenError":
        case "ErrorId":
        case "Unauthorized":
            res.status(401).json({ message: "Invalid Input" })
            break;
        case "ForbiddenAccess":
            res.status(403).json({ message: "Forbidden Access" })
            break;
        case "FalseInput":
            res.status(404).json({ message: "Correct input is required" })
            break;
        default:
            res.status(500).json({ message: "Internal server error" })
            break;
    }
}