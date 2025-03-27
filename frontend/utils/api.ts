const API_URL = 'http://localhost:8000';

/**
 * Upload a video file to the backend for AI analysis
 * @param file The video file to upload
 * @returns The analysis results from the backend
 */
export async function uploadVideo(file: File): Promise<any> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_URL}/upload/`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to upload video');
    }
    
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
}