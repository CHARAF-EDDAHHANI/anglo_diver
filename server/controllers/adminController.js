import * as adminModel from '../models/adminModel.js';

const register_Admin = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        const admin = await adminModel.register_Admin({ name, password, email });
        res.status(201).json({ message: 'Admin registered successfully', admin });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

const login_Admin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await adminModel.login_Admin(email, password);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(401).json({ message: 'Login failed', error: error.message });
    }
};

const logout_Admin = async (req, res) => {
    try {
        const { adminId } = req.body;
        await adminModel.logout_Admin(adminId);
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Logout failed', error: error.message });
    }
};

export { register_Admin, login_Admin, logout_Admin };