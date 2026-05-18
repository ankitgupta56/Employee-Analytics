import express from 'express';
import {
  getAIRecommendation,
  getBatchRecommendations,
} from '../controllers/aiController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes
router.use(authenticate);
router.use(authorize('admin', 'hr'));

router.post('/recommend', getAIRecommendation);
router.post('/recommend-batch', getBatchRecommendations);

export default router;
