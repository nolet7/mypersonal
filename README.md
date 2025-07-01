# SkillFlight - Engineering Skills Tracker

A focused application for tracking progress toward senior-level SRE, DevOps, Platform Engineering, and AWS Architecture skills, with visual feedback and personal milestones.

## Features

- **Multi-Role Tracking**: Track skills across SRE, DevOps, Platform Engineering, and AWS Architecture
- **Progress States**: Not Started, In Progress, and Completed with automatic timestamping
- **Visual Dashboard**: Beautiful progress visualization with role-specific metrics
- **Custom Skills**: Add your own skills to any category
- **Timeline View**: See your completed skills in chronological order
- **Notes System**: Track learning resources and implementation details

## Quick Start with Docker

### Prerequisites
- Docker
- Docker Compose

### Running the Application

1. **Clone and navigate to the project directory**

2. **Build and start the services:**
   ```bash
   docker-compose build
   docker-compose up
   ```

3. **Access the application:**
   - Web Application: http://localhost:8080
   - PostgreSQL Database: localhost:5433

### Services

- **Web Application**: Runs on port 8080 (nginx serving React build)
- **PostgreSQL Database**: Runs on port 5433 with persistent data storage

### Environment

The application includes:
- Production-optimized React build
- Nginx with gzip compression and security headers
- PostgreSQL 15 with initialized schema
- Persistent data volumes
- Health checks and restart policies

### Development

To stop the services:
```bash
docker-compose down
```

To rebuild after changes:
```bash
docker-compose build --no-cache
docker-compose up
```

To view logs:
```bash
docker-compose logs -f
```

### Database

The PostgreSQL database is automatically initialized with:
- Skills table schema
- Sample data
- Proper indexes for performance
- UUID support

Database credentials:
- Host: localhost:5433
- Database: skillflight
- Username: skilluser
- Password: flightpass2024

## Architecture

- **Frontend**: React + TypeScript + Tailwind CSS
- **Icons**: Lucide React
- **Database**: PostgreSQL 15
- **Web Server**: Nginx (production)
- **Containerization**: Docker + Docker Compose

## Ports

- **8080**: Web application (less common than 3000/80)
- **5433**: PostgreSQL database (less common than 5432)

This ensures better compatibility and avoids conflicts with other services.# Trigger build
# Trigger build
# Trigger build
