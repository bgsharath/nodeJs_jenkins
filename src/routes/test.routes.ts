// auth.routes.ts
import express from 'express';

const router = express.Router();

router.get('/health', (req, res) => {
    res.send('Server is up and running 1');
    }
);


export default router;
