from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class TextSegment(BaseModel):
    """Model for a text segment from speech-to-text processing"""
    text: str
    start: float
    end: float
    timestamp: str

class TranscriptData(BaseModel):
    """Model for speech-to-text transcript data"""
    full_text: str
    segments: List[TextSegment]

class Position(BaseModel):
    """Model for UI element position"""
    x: int
    y: int
    width: int
    height: int

class TextRegion(BaseModel):
    """Model for detected text in a video frame"""
    text: str
    confidence: float
    position: Position

class UIElement(BaseModel):
    """Model for detected UI element in a video frame"""
    type: str  # button, text_field, etc.
    position: Position

class FrameAnalysis(BaseModel):
    """Model for analysis result of a single video frame"""
    timestamp: float
    timestamp_formatted: str
    text_regions: List[TextRegion]
    ui_elements: List[UIElement]

class UIAnalysisResult(BaseModel):
    """Model for UI analysis results"""
    frame_count: int
    results: List[FrameAnalysis]

class TestStep(BaseModel):
    """Model for a test step"""
    step_number: int
    action: str
    expected_result: Optional[str] = None
    timestamp: Optional[str] = None
    ui_element: Optional[str] = None

class BugReport(BaseModel):
    """Model for a bug report"""
    description: str
    timestamp: Optional[str] = None
    severity: Optional[str] = None  # High, Medium, Low

class TestCase(BaseModel):
    """Model for a test case extracted from video"""
    test_name: str
    app_url: Optional[str] = None
    steps: List[TestStep]
    bugs: List[BugReport] = []

class TestAutomation(BaseModel):
    """Model for generated test automation code"""
    test_name: str
    file_name: str
    code: str
    language: str = "typescript"
    framework: str = "playwright"

class VideoAnalysisResult(BaseModel):
    """Model for complete video analysis result"""
    id: str = Field(default_factory=lambda: datetime.now().strftime("%Y%m%d%H%M%S"))
    video_url: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "processing"  # processing, completed, failed
    transcript: Optional[TranscriptData] = None
    ui_analysis: Optional[UIAnalysisResult] = None
    test_case: Optional[TestCase] = None
    test_automation: Optional[TestAutomation] = None
    error: Optional[str] = None 