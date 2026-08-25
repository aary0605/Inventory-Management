const path = require("path");
const bcrypt = require("bcrypt");

const { insertData, checkEmail } = require("../database/users");
const getUser = require("../database/login");

const  validateSignup  = require("../utils/validators");



home = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
};

loginPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
};

dashboard = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/dashboard.html"));
    
};

// =========================
// SIGNUP
// =========================

signup = async (req, res) => {
    try {
        const data = req.body;

        // Validate user input
        const validation = validateSignup(data);

        if (!validation.status) {
            return res.status(400).json(validation);
        }

        // Check if email already exists
        const user = await checkEmail(data.Email);

        if (user.length > 0) {
            return res.status(400).json({
                status: false,
                error: ["Email already used"],
            });
        }

        // Hash password
        const hash = await bcrypt.hash(data.Password, 10);

        // Save user
        await insertData(
            data.Name.trim(),
            data.Email.trim(),
            hash
        );

        res.status(201).json({
            status: true,
            error: [],
            redirect: "/login",
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            status: false,
            error: ["Internal Server Error"],
        });
    }
};

// =========================
// LOGIN
// =========================

login = async (req, res) => {
    try {
        const data = req.body;

        const user = await getUser(data.Username);

        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                error: ["User not found"],
            });
        }

        const passwordMatch = await bcrypt.compare(
            data.Password,
            user[0].password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                error: ["Incorrect Password"],
            });
        }

        res.status(200).json({
            success: true,
            message: "Login Successful",
            redirect: "/dashboard",
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            error: ["Internal Server Error"],
        });
    }
};

module.exports = {home,loginPage,dashboard,signup,login};