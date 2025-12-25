import express from 'express';
import * as adminController from '../controllers/adminController.js';

const router =  express.Router();
router.post('/admin/register', adminController.register_Admin);
router.post('/admin/login', adminController.login_Admin);
router.post('/admin/logout', adminController.logout_Admin);
export default router;