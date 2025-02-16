import { Request, Response, NextFunction } from 'express';
import { elasticService } from '../services/elastic.service';
import logger from '../config/logger';

export class ElasticController {
  async createIndex(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { index } = req.body;
      const result = await elasticService.createIndex(index);
      logger.info('Index created successfully', {
        context: 'PostController',
        data: req.body,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async addDocument(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { index, document } = req.body;      
      const result = await elasticService.addDocument(index, document);
      logger.info('document created successfully', {
        context: 'PostController',
        data: req.body,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { index, query } = req.body;      
      const result = await elasticService.search(index, query);
      logger.info('Searched successfully', {
        context: 'PostController',
        data: req.body,
      });
      res.status(200).json(result.hits.hits);
    } catch (error) {
      next(error);
    }
  }

  async deleteIndex(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { index } = req.body;
      const result = await elasticService.deleteIndex(index);
      logger.info('Deleted Index successfully', {
        context: 'PostController',
        data: req.body,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const elasticController = new ElasticController();
