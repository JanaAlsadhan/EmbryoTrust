
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const Admin = require('../models/AdminModel');
const Doctor = require('../models/DoctorModel');

    exports.checkAdmin = async (req, res, next) => {
        try {
            const token = req.header("Authorization")?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ error: "Access denied, no token provided" });
            }
    
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const admin = await Admin.findById(decoded.id).select("-password");
    
            if (!admin) {
                return res.status(401).json({ error: "Admin not found" });
            }
    
            req.user = admin; // Attach admin details to req.user
            next();
        } catch (error) {
            res.status(401).json({ error: "Invalid token" });
        }
    };


// Middleware to verify JWT token
exports.protect = (req, res, next) => {
    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return next(new AppError('Not authenticated', 401));
    }
  
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return next(new AppError('Invalid token', 401));
    }
};

// Middleware to check admin role
exports.checkAdmin = (req, res, next) => {
    if (req.user?.role !== 'Admin') {
        return next(new AppError('Access denied. Only admin can perform this action', 403));
    }
    next();
};


// Middleware to check patient role
exports.checkEmbryologist =async (req, res, next) => {
   
    try {
        const userId = req.user?.id; // Ensure req.user exists
        
    
        if (!userId) {
          return res.status(401).json({ message: "Unauthorized: User not found" });
        }
    
        // Find the doctor by userId
        const doctor = await Doctor.findOne({ _id:userId });
        if (!doctor) {
          return res.status(403).json({ message: "Access denied: Not a doctor" });
        }
    
        // Check if the doctor is not a Fertility Specialist
        if (doctor.speciality !== "Embryologist") {
          return res.status(403).json({ message: "Access denied: Requires Fertility Specialist role" });
        }
    
        next(); // Proceed if the user is a Fertility Specialist
      } catch (error) {
        console.error("Middleware error:", error);
        res.status(500).json({ message: "Server error" });
      }
};

// Middleware to check doctor role
exports.checkFertility = async(req, res, next) => {
    try {
        const userId = req.user?.id; // Ensure req.user exists
    
        if (!userId) {
          return res.status(401).json({ message: "Unauthorized: User not found" });
        }
    
        // Find the doctor by userId
        const doctor = await Doctor.findOne({ _id:userId });
    
        if (!doctor) {
          return res.status(403).json({ message: "Access denied: Not a doctor" });
        }
    
        // Check if the doctor is not a Fertility Specialist
        if (doctor.speciality !== "Fertility Specialist") {
          return res.status(403).json({ message: "Access denied: Requires Fertility Specialist role" });
        }
    
        next(); // Proceed if the user is a Fertility Specialist
      } catch (error) {
        console.error("Middleware error:", error);
        res.status(500).json({ message: "Server error" });
      }
};
