import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

dotenv.config();
// Initialize Elasticsearch client
const client = new Client({
  node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
  auth: {
    username: process.env.ELASTICSEARCH_USER || 'elastic',
    password: process.env.ELASTICSEARCH_PASSWORD || 'password',
  },
});

export default client;