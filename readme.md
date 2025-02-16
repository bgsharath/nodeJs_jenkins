
# PostgreSQL Installation on Ubuntu

### Step 1: Update the System
```bash
sudo apt update && sudo apt upgrade -y
```

### Step 2: Install PostgreSQL
Install PostgreSQL using the package manager:
```bash
sudo apt install postgresql postgresql-contrib -y
psql --version
```

### Step 3: Start and Enable PostgreSQL
Start PostgreSQL:
```bash
sudo systemctl start postgresql
```

Enable PostgreSQL to start on boot:
```bash
sudo systemctl enable postgresql
```

### Step 4: Configure PostgreSQL
Switch to the `postgres` user:
```bash
sudo -i -u postgres
```

Access the PostgreSQL shell:
```sql
CREATE DATABASE mydatabase;
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;
```

Exit the PostgreSQL shell:
```sql
\q
```

### Step 5: Allow External Connections (Optional)
Edit the PostgreSQL configuration file to allow external access:
```bash
sudo nano /etc/postgresql/12/main/postgresql.conf
```

Change `listen_addresses`:
```text
listen_addresses = '*'
```

Edit the `pg_hba.conf` file to add client authentication rules:
```bash
sudo nano /etc/postgresql/12/main/pg_hba.conf
```

Add the following line:
```text
host    all             all             0.0.0.0/0            md5
```

Restart PostgreSQL to apply changes:
```bash
sudo systemctl restart postgresql
```

Check if PostgreSQL is connected:
```bash
pg_isready
```

### Step 6: Add Prisma Schema
Add the `schema.prisma` to your application:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(uuid()) // or use cuid()
  firstName String
  lastName  String
  age       Int
  photoUrl  String?
  email     String   @unique
  password  String
  gender    String
  skills    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Run the migration:
```bash
npx prisma migrate dev
```

---

# Nginx Installation and Configuration

### Step 1: Install Nginx on Ubuntu
Update your package list:
```bash
sudo apt update
```

Install Nginx:
```bash
sudo apt install nginx
```

Check if Nginx is running:
```bash
sudo systemctl status nginx
```

If it's not running, start it with:
```bash
sudo systemctl start nginx
```

Enable Nginx to start on boot:
```bash
sudo systemctl enable nginx
```

### Step 2: Configure Nginx as a Reverse Proxy
Edit the Nginx configuration file:
```bash
sudo nano /etc/nginx/sites-available/default
```

Add the following reverse proxy configuration:
```nginx
server {
    listen 80;

    server_name your_domain_or_ip;  # Replace with your domain or EC2 public IP

    location /api/ {
        proxy_pass http://localhost:3000/;  # The port your Node.js app is running on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

With this setup, you can call the API like:
```text
http://your_domain_or_ip/api/auth/login
```

### Step 3: Test the Nginx Configuration
Test the Nginx configuration:
```bash
sudo nginx -t
```

### Step 4: Restart Nginx
Restart Nginx to apply the configuration changes:
```bash
sudo systemctl restart nginx
```

---

Now, your Node.js application should be accessible via Nginx acting as a reverse proxy, and PostgreSQL should be set up and ready for use!


# ELK Implementation Steps

## ELK on macOS

1. **Download & Install Elasticsearch**: [https://www.elastic.co/downloads/elasticsearch](https://www.elastic.co/downloads/elasticsearch)
2. **Start Elasticsearch**: `./bin/elasticsearch`
3. **Test if Elasticsearch is running**: `curl -X GET "http://localhost:9200"`

4. **Install Kibana**: [https://www.elastic.co/downloads/kibana](https://www.elastic.co/downloads/kibana)
5. **Configure kibana.yml file**: 
   - `elasticsearch.hosts: ["http://localhost:9200"]`
6. **Start Kibana**: `./bin/kibana`
7. **Access Kibana via**: [http://localhost:5601](http://localhost:5601)

8. **Install Logstash**: [https://www.elastic.co/downloads/logstash](https://www.elastic.co/downloads/logstash)
9. **Create a configuration file**: `logstash.conf`
    ```
    input {
      http {
        port => 8080
      }
    }

    output {
      elasticsearch {
        hosts => ["http://localhost:9200"]
        index => "app-logs-%{+YYYY.MM.dd}"
      }
    }
    ```
10. **Run Logstash**: `./bin/logstash -f /yourpath/logstash.conf`

## ELK on Windows

### Install Elasticsearch on Windows
1. **Download Elasticsearch**: [https://www.elastic.co/downloads/elasticsearch](https://www.elastic.co/downloads/elasticsearch)  
   Download the ZIP file.
2. **Extract Elasticsearch**:  
   Extract the contents to a directory of your choice, such as `C:\elasticsearch`.
3. **Configure Elasticsearch**:  
   Navigate to the `config` directory inside the extracted Elasticsearch folder (`C:\elasticsearch\config`).  
   Open the `elasticsearch.yml` file with a text editor (e.g., Notepad or VS Code).

   Key settings to configure:
    ```
    cluster.name: my-elasticsearch-cluster
    node.name: my-node
    network.host: localhost
    http.port: 9200
    ```

4. **Start Elasticsearch**:  
   Open a command prompt and navigate to the `bin` directory:
   ```bash
   cd C:\elasticsearch\bin
   elasticsearch.bat
   ```

### Install Kibana
1. **Download Kibana**: [https://www.elastic.co/downloads/kibana](https://www.elastic.co/downloads/kibana)  
   Extract the ZIP file.  
   Configure Kibana:  
   Open `config/kibana.yml` in the Kibana folder. Set `elasticsearch.hosts` to `http://localhost:9200`.
2. **Start Kibana**:  
   Open a command prompt in the Kibana folder and run:
   ```bash
   bin\kibana.bat
   ```

### Install Logstash
1. **Download Logstash**: [https://www.elastic.co/downloads/logstash](https://www.elastic.co/downloads/logstash)  
   Extract the ZIP file.
2. **Configure Logstash**:  
   Create a configuration file (e.g., `logstash.conf`) with this content:
    ```
    input {
      http {
        port => 8080
      }
    }

    output {
      elasticsearch {
        hosts => ["http://localhost:9200"]
        index => "app-logs-%{+YYYY.MM.dd}"
      }
    }
    ```
3. **Start Logstash**:  
   Open a command prompt in the Logstash folder and run:
   ```bash
   bin\logstash -f logstash.conf
   ```

## Node.js Code

1. **Install Node.js dependencies**:  
   ```bash
   npm install @elastic/elasticsearch winston winston-elasticsearch express body-parser
   ```

2. **Create `logger.ts`**:
    ```javascript
    const { createLogger, format, transports } = require('winston');

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

    module.exports = { logger };
    ```

3. **Create `app.ts`**:  
   Add `logger.info("Hello World");`

4. **Run Node.js app**:  
   ```bash
   npm run dev
   ```

5. **Check Kibana for logs**:  
   Access Kibana at [http://localhost:5601/app/management/data/index_management/indices](http://localhost:5601/app/management/data/index_management/indices).  
   You can see the logs in the index `app-logs-2022.03.02`. Click on **Discover** to view the logs.

