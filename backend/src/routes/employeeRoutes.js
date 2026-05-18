import express from 'express';
import {
  addEmployee,
  getAllEmployees,
  searchEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats,
} from '../controllers/employeeController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes
router.use(authenticate);

// Search route must come before :id route
router.get('/search', searchEmployees);
router.get('/stats/summary', getEmployeeStats);

// CRUD operations
router.post('/', authorize('admin', 'hr'), addEmployee);
router.get('/', getAllEmployees);
router.get('/:id', getEmployee);
router.put('/:id', authorize('admin', 'hr'), updateEmployee);
router.delete('/:id', authorize('admin'), deleteEmployee);

export default router;
