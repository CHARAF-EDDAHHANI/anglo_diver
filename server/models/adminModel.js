import { v4 as uuidv4 } from 'uuid';
import { Encryption, TokenGenerate, comparePWD } from '../Agents/Encryption_Token.js';
import { readJson, writeJson } from '../Agents/DBAccess.js';

const fileKey = 'admin';

// Register a new admin
export const register_Admin = async (adminData) => {
    const { name = '', password = '', email = '' } = adminData;

    const adminList = await readJson(fileKey);

    if (adminList.some(admin => admin.email === email)) {
        throw new Error('Email already registered');
    }

    const hashedPassword = await Encryption(password);
    const adminId = uuidv4();
    const adminToken = TokenGenerate({ adminId, email, role: 'admin' });

    const newAdmin = { adminId, name, email, password: hashedPassword, adminToken };
    adminList.push(newAdmin);
    await writeJson(fileKey, adminList);

    return newAdmin;
};

// Get admin by email
export const getAdminByEmail = async (email) => {
    const adminList = await readJson(fileKey);
    return adminList.find(admin => admin.email === email);
};

// Get admin by ID
export const getAdminById = async (adminId) => {
    const adminList = await readJson(fileKey);
    return adminList.find(admin => admin.adminId === adminId);
};

// Update admin token in DB
export const updateAdminToken = async (adminId, token) => {
    const adminList = await readJson(fileKey);
    const adminIndex = adminList.findIndex(admin => admin.adminId === adminId);

    if (adminIndex === -1) throw new Error('Admin not found');

    adminList[adminIndex].adminToken = token;
    await writeJson(fileKey, adminList);
};

// Login admin
export const login_Admin = async (email, password) => {
    const admin = await getAdminByEmail(email);
    const isPasswordValid = admin ? await comparePWD(password, admin.password) : false;

    if (!admin || !isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    const token = TokenGenerate({ adminId: admin.adminId, email: admin.email, role: 'admin' });
    await updateAdminToken(admin.adminId, token);

    return {
        adminId: admin.adminId,
        name: admin.name,
        email: admin.email,
        adminToken: token,
    };
};

// Logout admin
export const logout_Admin = async (adminId) => {
    const admin = await readJson(fileKey);
    const adminIndex = admin.findIndex(admin => admin.adminId === adminId);

    if (adminIndex === -1) throw new Error('Admin not found');

    admin[adminIndex].adminToken = null; // Invalidate the token
    await writeJson(fileKey, admin);
    return { message: 'Admin logged out successfully' };
};

