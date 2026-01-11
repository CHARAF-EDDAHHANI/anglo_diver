import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


export async function Encryption(password) {
  const saltRounds = 5; 
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds); 
    return hashedPassword;
  } catch (err) {
    throw new Error('Error hashing password: ' + err.message); 
  }
};

export async function comparePWD(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (err) {
    console.error('Error comparing passwords:', err.message);
    throw new Error('Error comparing passwords: ' + err.message);
  }
};



export const TokenGenerate = (adminId, email, userType) => {
  try {
    return jwt.sign(
      { adminId, email, userType }, // Payload containing adminId and email
      JWT_SECRET,        
      { expiresIn: '72h' }
    );
  } catch (err) {
    throw new Error("Error generating JWT for seller: " + err.message);
  }
};

// verify tkn
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error('Token verification failed:', err.message);
    throw new Error('Invalid or expired token');
  }
};
