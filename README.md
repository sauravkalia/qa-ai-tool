# QA AI Tool

An AI-powered video quality analysis tool that helps content creators identify and fix quality issues in their videos.

## Features

- Upload videos for quality analysis
- AI-driven detection of lighting, audio, and other quality issues
- Detailed feedback and recommendations for improvement
- Timestamps for identified issues

## Project Structure

This project is a monorepo containing:

- FastAPI backend for video processing
- Next.js frontend for user interface

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 16+ (for local development)
- Python 3.9+ (for local development)

### Development Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/qa-ai-tool.git
cd qa-ai-tool
```

2. Start the development environment:

```bash
docker-compose up
```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Backend API docs: http://localhost:8000/docs

### Running Locally (without Docker)

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
sh init.sh       
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Technologies Used

- **Backend**:
  - FastAPI
  - OpenCV (for video processing)
  - PyTorch (placeholder for future AI model)

- **Frontend**:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Improvements

- Implement real AI model for video quality analysis
- Add user authentication
- Support for longer videos and higher resolutions
- Generate detailed reports with visual aids