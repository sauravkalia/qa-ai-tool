import os
import cv2
import numpy as np
import pytesseract
import logging
import tempfile
import json
from pathlib import Path

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ui_detection")

# Default Tesseract path, may need configuration
pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'  # Update with your Tesseract path

class UIElementDetector:
    """Class for detecting UI elements in video frames"""
    
    def __init__(self):
        # Common UI element templates (could be expanded)
        self.templates = {}
        
    async def extract_frames(self, video_path, sample_rate=1):
        """
        Extract frames from the video at specified sample rate
        
        Args:
            video_path: Path to the video file
            sample_rate: Number of frames to extract per second
            
        Returns:
            list: List of extracted frames as numpy arrays
        """
        frames = []
        try:
            # Open the video file
            cap = cv2.VideoCapture(video_path)
            if not cap.isOpened():
                raise ValueError(f"Could not open video file: {video_path}")
            
            # Get video properties
            fps = cap.get(cv2.CAP_PROP_FPS)
            frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
            duration = frame_count / fps
            
            logger.info(f"Video: {frame_count} frames, {fps} fps, {duration:.2f} seconds")
            
            # Calculate frame extraction interval
            interval = int(fps / sample_rate)
            if interval < 1:
                interval = 1
                
            # Extract frames at the specified interval
            frame_positions = []
            current_position = 0
            
            while current_position < frame_count:
                frame_positions.append(current_position)
                current_position += interval
                
            for pos in frame_positions:
                cap.set(cv2.CAP_PROP_POS_FRAMES, pos)
                ret, frame = cap.read()
                if ret:
                    frames.append({
                        "frame": frame,
                        "timestamp": pos / fps
                    })
                
            cap.release()
            logger.info(f"Extracted {len(frames)} frames for analysis")
            return frames
        
        except Exception as e:
            logger.error(f"Error extracting frames: {e}")
            if 'cap' in locals() and cap is not None:
                cap.release()
            raise
    
    async def detect_text(self, frame):
        """
        Detect text in a frame using Tesseract OCR
        
        Args:
            frame: Frame image as numpy array
            
        Returns:
            list: Detected text regions with coordinates and content
        """
        try:
            # Convert to grayscale for better OCR
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            
            # Apply some preprocessing to improve OCR accuracy
            gray = cv2.GaussianBlur(gray, (5, 5), 0)
            
            # Apply threshold to get black and white image
            _, binary = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
            
            # Get OCR data including bounding boxes
            ocr_data = pytesseract.image_to_data(binary, output_type=pytesseract.Output.DICT)
            
            text_regions = []
            n_boxes = len(ocr_data['text'])
            
            for i in range(n_boxes):
                # Filter out empty results and low-confidence detections
                if int(ocr_data['conf'][i]) > 60 and ocr_data['text'][i].strip() != '':
                    x, y, w, h = ocr_data['left'][i], ocr_data['top'][i], ocr_data['width'][i], ocr_data['height'][i]
                    
                    text_regions.append({
                        "text": ocr_data['text'][i],
                        "confidence": ocr_data['conf'][i],
                        "position": {
                            "x": x,
                            "y": y,
                            "width": w,
                            "height": h
                        }
                    })
            
            return text_regions
            
        except Exception as e:
            logger.error(f"Error detecting text: {e}")
            raise
    
    async def detect_ui_elements(self, frame):
        """
        Detect UI elements in a frame
        
        Args:
            frame: Frame image as numpy array
            
        Returns:
            list: Detected UI elements
        """
        try:
            # Convert to grayscale
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            
            # Detect edges
            edges = cv2.Canny(gray, 50, 150)
            
            # Find contours
            contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            
            # Filter contours to find potential UI elements (buttons, textboxes, etc.)
            ui_elements = []
            
            for contour in contours:
                # Calculate contour area and perimeter
                area = cv2.contourArea(contour)
                perimeter = cv2.arcLength(contour, True)
                
                # Filter out very small contours
                if area < 100:
                    continue
                
                # Approximate the contour shape
                approx = cv2.approxPolyDP(contour, 0.02 * perimeter, True)
                
                # Get bounding rectangle
                x, y, w, h = cv2.boundingRect(contour)
                
                # Determine element type based on shape
                if len(approx) == 4:  # Rectangular elements (likely buttons, text fields)
                    aspect_ratio = float(w) / h
                    
                    if 0.9 <= aspect_ratio <= 1.1:  # Square - could be a button
                        element_type = "button"
                    elif aspect_ratio > 2:  # Wide rectangle - could be a text field
                        element_type = "text_field"
                    else:
                        element_type = "rectangle"
                        
                    ui_elements.append({
                        "type": element_type,
                        "position": {
                            "x": x,
                            "y": y,
                            "width": w,
                            "height": h
                        }
                    })
            
            return ui_elements
            
        except Exception as e:
            logger.error(f"Error detecting UI elements: {e}")
            raise

async def analyze_video_ui(video_path):
    """
    Analyze a video to detect UI elements and text
    
    Args:
        video_path: Path to the video file
        
    Returns:
        dict: Analysis results with detected UI elements and text
    """
    detector = UIElementDetector()
    
    try:
        # Extract frames from the video (1 frame per second)
        frames = await detector.extract_frames(video_path, sample_rate=1)
        
        results = []
        
        # Process each frame
        for frame_data in frames:
            frame = frame_data["frame"]
            timestamp = frame_data["timestamp"]
            
            # Detect text
            text_regions = await detector.detect_text(frame)
            
            # Detect UI elements
            ui_elements = await detector.detect_ui_elements(frame)
            
            # Save results for this frame
            results.append({
                "timestamp": timestamp,
                "timestamp_formatted": f"{int(timestamp // 60):02d}:{int(timestamp % 60):02d}",
                "text_regions": text_regions,
                "ui_elements": ui_elements
            })
        
        return {
            "frame_count": len(frames),
            "results": results
        }
        
    except Exception as e:
        logger.error(f"Error analyzing video: {e}")
        raise 