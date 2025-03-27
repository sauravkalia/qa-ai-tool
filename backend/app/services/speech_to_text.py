import os
import tempfile
import whisper
import ffmpeg
import logging
from pathlib import Path

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("speech_to_text")

# Load the Whisper model once when the module is imported
# Default to using the "base" model, which is smaller and faster
# Options include: "tiny", "base", "small", "medium", "large"
try:
    model = whisper.load_model("base")
    logger.info("Whisper model loaded successfully")
except Exception as e:
    logger.error(f"Failed to load Whisper model: {e}")
    model = None

async def extract_audio_from_video(video_path):
    """
    Extract audio from a video file
    
    Args:
        video_path: Path to the video file
        
    Returns:
        Path to the extracted audio file
    """
    # Create a temporary file for the audio
    audio_path = tempfile.mktemp(suffix=".mp3")
    
    try:
        # Extract audio using ffmpeg
        (
            ffmpeg
            .input(video_path)
            .output(audio_path, acodec='libmp3lame', ac=1, ar='16k')
            .run(quiet=True, overwrite_output=True)
        )
        return audio_path
    except Exception as e:
        logger.error(f"Failed to extract audio: {e}")
        if os.path.exists(audio_path):
            os.unlink(audio_path)
        raise

async def transcribe_audio(audio_path):
    """
    Transcribe the audio using Whisper AI
    
    Args:
        audio_path: Path to the audio file
        
    Returns:
        dict: Transcription result with text and segments
    """
    if model is None:
        raise RuntimeError("Whisper model not loaded")
    
    try:
        # Transcribe the audio
        result = model.transcribe(audio_path)
        
        # Format the segments with timestamps
        formatted_segments = []
        for segment in result["segments"]:
            formatted_segments.append({
                "text": segment["text"],
                "start": segment["start"],
                "end": segment["end"],
                "timestamp": f"{int(segment['start'] // 60):02d}:{int(segment['start'] % 60):02d}"
            })
        
        return {
            "full_text": result["text"],
            "segments": formatted_segments
        }
    except Exception as e:
        logger.error(f"Failed to transcribe audio: {e}")
        raise

async def process_video_to_text(video_path):
    """
    Process a video file to extract and transcribe the speech
    
    Args:
        video_path: Path to the video file
        
    Returns:
        dict: Transcription result
    """
    audio_path = None
    try:
        # Extract audio from video
        audio_path = await extract_audio_from_video(video_path)
        
        # Transcribe the audio
        result = await transcribe_audio(audio_path)
        
        return result
    finally:
        # Clean up temporary files
        if audio_path and os.path.exists(audio_path):
            os.unlink(audio_path) 