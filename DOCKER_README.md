# Laravel PEMDAS Docker Setup

This project includes Docker configuration for running Laravel with npm and SQLite support.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

### 1. Build and Run with Docker Compose

```bash
# Build and start the container
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d
```

### 2. Access the Application

The application will be available at: `http://localhost:8080`

### 3. Running Commands Inside the Container

```bash
# Access the container shell
docker-compose exec laravel-pemdas bash

# Run Laravel commands
docker-compose exec laravel-pemdas php artisan migrate
docker-compose exec laravel-pemdas php artisan db:seed

# Run npm commands
docker-compose exec laravel-pemdas npm run dev
docker-compose exec laravel-pemdas npm run build

# Run Composer commands
docker-compose exec laravel-pemdas composer install
```

### 4. Development Workflow

For development, you can mount your local directory as a volume (already configured in docker-compose.yml) so changes are reflected immediately.

### 5. Database

The project is configured to use SQLite database located at `database/database.sqlite`. The database file is automatically created when the container starts.

### 6. Environment Variables

The container uses the `.env.docker` file for Docker-specific environment variables. You can modify this file as needed for your Docker environment.

## Docker Files Structure

- `Dockerfile` - Main Docker image configuration
- `docker-compose.yml` - Container orchestration
- `docker/apache.conf` - Apache virtual host configuration
- `.env.docker` - Docker environment variables
- `.dockerignore` - Files to exclude from Docker build

## Stopping the Application

```bash
# Stop the containers
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## Troubleshooting

1. **Permission Issues**: If you encounter permission issues, make sure the storage and bootstrap/cache directories are writable:
   ```bash
   docker-compose exec laravel-pemdas chmod -R 755 storage bootstrap/cache
   ```

2. **Database Issues**: If you need to reset the database:
   ```bash
   docker-compose exec laravel-pemdas rm database/database.sqlite
   docker-compose exec laravel-pemdas touch database/database.sqlite
   docker-compose exec laravel-pemdas php artisan migrate
   ```

3. **Asset Building**: If assets are not building correctly:
   ```bash
   docker-compose exec laravel-pemdas npm install
   docker-compose exec laravel-pemdas npm run build
   ```
