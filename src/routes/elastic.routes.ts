import { Router } from 'express';
import { elasticController } from '../controllers/elastic.controller';

const router = Router();

router.post('/create-index', elasticController.createIndex);
router.post('/add-document', elasticController.addDocument);
router.post('/search', elasticController.search);
router.delete('/delete-index', elasticController.deleteIndex);

export default router;


