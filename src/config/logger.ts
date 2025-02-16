// import winston from 'winston';
// import { ElasticsearchTransport } from 'winston-elasticsearch';
// import { Client } from '@elastic/elasticsearch';
// import dotenv from 'dotenv';

// dotenv.config();
// // Elasticsearch client
// const elasticsearchClient = new Client({
//   node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200', // Elasticsearch URL
// });

// const esTransportOpts = {
//   level: 'info', // Minimum log level to store
//   client: elasticsearchClient
// };

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
//   ),
//   transports: [
//     new ElasticsearchTransport(esTransportOpts),
//     new winston.transports.Console()
//   ],
// });

// // const logger = winston.createLogger({
// //   level: 'info', // Default log level
// //   format: winston.format.combine(
// //     winston.format.timestamp(),
// //     winston.format.json()
// //   ),
// //   transports: [
// //     new winston.transports.File({
// //         filename: '/Users/sharathbg/Documents/codes☺️😄🧐🕵🏻/nodebackendPrisma/logs/app.log',  // Specify the file path
// //         level: 'info',  // Minimum log level to write to file
// //     }),
// //     new winston.transports.Console({
// //       format: winston.format.combine(
// //         winston.format.colorize(),
// //         winston.format.simple()
// //       ),
// //     }),
// //     new ElasticsearchTransport(esTransportOpts),    
// //   ],
// // });

// export default logger;


// .......................

// .......................................................................
import { createLogger, format, transports } from 'winston';

const logstashTransport = new transports.Http({
  host: 'localhost',
  port: 8080,
  path: '/',
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    logstashTransport,
    new transports.Console(), // Optional console log
  ],
});

// Optionally, a manual function to send logs via Axios:
// async function sendLogToLogstash(logData) {
//   try {
//     await axios.post(logstashURL, logData);
//     console.log('Log sent to Logstash');
//   } catch (error) {
//     console.error('Error sending log to Logstash:', error.message);
//   }
// }

export default logger