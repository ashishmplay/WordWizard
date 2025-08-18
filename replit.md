# Speech Recording Game Application

## Overview

A child-friendly web application for recording speech sessions with images. The app displays a series of images with corresponding words, allowing users to record their pronunciation while providing simple navigation controls for parents/supervisors.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent UI design
- **State Management**: TanStack Query (React Query) for server state management
- **Audio Recording**: Web Audio API with MediaRecorder for browser-based audio capture

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **File Upload**: Multer middleware for handling audio file uploads with 50MB limit
- **Development Mode**: Vite integration for hot module replacement and development server
- **API Structure**: RESTful endpoints for session and recording management

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema**: Three main entities - users, sessions, and recordings
- **In-Memory Storage**: Fallback MemStorage implementation for development/testing
- **File Storage**: Local filesystem storage for uploaded audio recordings

### Authentication and Authorization
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **Basic Structure**: User authentication schema prepared but not fully implemented

### Core Features
- **Audio Recording**: Browser-based recording with error handling for microphone permissions
- **Image Display**: Predefined set of images with associated words for pronunciation practice
- **Session Tracking**: Progress tracking through image sequences with completion status
- **Parent Controls**: Navigation buttons for moving between images and session management

### Development Tools
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Database Migrations**: Drizzle Kit for schema management and migrations
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation
- **Error Handling**: Runtime error overlays and comprehensive error boundaries

## External Dependencies

### Database and Storage
- **Neon Database**: Serverless PostgreSQL database (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect

### UI Framework and Components
- **Radix UI**: Comprehensive component library for accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: Pre-built component system with consistent design tokens

### Development and Build Tools
- **Vite**: Fast build tool with HMR support and plugin ecosystem
- **Replit Integration**: Custom plugins for Replit development environment
- **TypeScript**: Full type safety across the entire application stack

### Audio and Media
- **Web APIs**: MediaRecorder and getUserMedia for audio recording functionality
- **File Handling**: Multer for server-side file upload processing

### State Management and Networking
- **TanStack Query**: Powerful data synchronization and caching for React
- **React Hook Form**: Form handling with validation support
- **Zod**: Schema validation library integrated with Drizzle for runtime type safety