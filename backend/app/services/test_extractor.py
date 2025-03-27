import os
import logging
import json
from langchain.prompts import PromptTemplate
from langchain.llms import OpenAI
from langchain.chains import LLMChain
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("test_extractor")

# LLM setup
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

class TestStepExtractor:
    """Class for extracting test steps from video analysis"""
    
    def __init__(self):
        if not OPENAI_API_KEY:
            logger.warning("OpenAI API key not found. Test extraction will not work.")
            self.llm = None
        else:
            self.llm = OpenAI(temperature=0.2, api_key=OPENAI_API_KEY)
        
        # Prompt template for extracting test steps
        self.test_step_template = PromptTemplate(
            input_variables=["transcript", "ui_elements"],
            template="""
            You are an AI assistant that helps in extracting test steps from video recordings of app testing.
            
            Based on the following transcript and UI elements data, identify and list the test steps performed by the tester.
            Include expected behaviors and bugs mentioned by the tester.
            
            Transcript:
            {transcript}
            
            UI Elements detected:
            {ui_elements}
            
            Please extract the test steps in the following JSON format:
            ```json
            {{
                "test_name": "Name of the test based on the content",
                "app_url": "The URL being tested (if mentioned)",
                "steps": [
                    {{
                        "step_number": 1,
                        "action": "The action performed (e.g., 'Click login button')",
                        "expected_result": "The expected behavior (if mentioned)",
                        "timestamp": "The timestamp in the video",
                        "ui_element": "The UI element interacted with (if detected)"
                    }},
                    ...
                ],
                "bugs": [
                    {{
                        "description": "Description of the bug",
                        "timestamp": "When it was observed in the video",
                        "severity": "High/Medium/Low (if mentioned)"
                    }},
                    ...
                ]
            }}
            ```
            
            Only include information that is actually present in the transcript or UI data. If certain information isn't available, use reasonable defaults or leave fields empty.
            Ensure the output is valid JSON.
            """
        )
        
        if self.llm:
            self.test_chain = LLMChain(llm=self.llm, prompt=self.test_step_template)
    
    async def extract_test_steps(self, transcript, ui_elements):
        """
        Extract test steps from transcript and UI elements
        
        Args:
            transcript: Transcript data from speech-to-text
            ui_elements: UI elements data from video analysis
            
        Returns:
            dict: Extracted test steps in structured format
        """
        if not self.llm:
            raise RuntimeError("LLM not initialized. Check OpenAI API key.")
        
        try:
            # Format transcript for prompt
            full_text = transcript.get("full_text", "")
            segments = transcript.get("segments", [])
            
            formatted_transcript = full_text + "\n\nDetailed segments with timestamps:\n"
            for segment in segments:
                formatted_transcript += f"{segment.get('timestamp', '00:00')}: {segment.get('text', '')}\n"
            
            # Format UI elements for prompt
            formatted_ui = json.dumps(ui_elements, indent=2)
            
            # Run the LLM chain
            result = await self.test_chain.arun(
                transcript=formatted_transcript,
                ui_elements=formatted_ui
            )
            
            # Extract JSON from the result
            json_start = result.find('```json') + 7
            json_end = result.find('```', json_start)
            
            if json_start > 7 and json_end > json_start:
                json_str = result[json_start:json_end].strip()
            else:
                json_str = result.strip()
            
            # Parse the JSON
            test_steps = json.loads(json_str)
            return test_steps
            
        except Exception as e:
            logger.error(f"Error extracting test steps: {e}")
            raise

async def extract_test_cases(transcript_data, ui_data):
    """
    Extract test cases from video analysis data
    
    Args:
        transcript_data: Transcript data from speech-to-text
        ui_data: UI elements data from video analysis
        
    Returns:
        dict: Extracted test cases
    """
    extractor = TestStepExtractor()
    
    try:
        test_steps = await extractor.extract_test_steps(transcript_data, ui_data)
        return test_steps
    except Exception as e:
        logger.error(f"Error in test case extraction: {e}")
        raise 