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
logger = logging.getLogger("test_generator")

# LLM setup
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

class PlaywrightTestGenerator:
    """Class for generating Playwright test automation code"""
    
    def __init__(self):
        if not OPENAI_API_KEY:
            logger.warning("OpenAI API key not found. Test generation will not work.")
            self.llm = None
        else:
            self.llm = OpenAI(temperature=0.2, api_key=OPENAI_API_KEY)
        
        # Prompt template for generating Playwright test code
        self.test_code_template = PromptTemplate(
            input_variables=["test_steps", "app_url"],
            template="""
            You are an AI assistant that specializes in generating Playwright test automation code based on test steps.
            
            Generate a complete, executable Playwright test script in TypeScript that automates the following test steps:
            
            {test_steps}
            
            The app URL is: {app_url}
            
            Follow these guidelines:
            1. Include proper imports and setup code
            2. Implement proper waiting for elements before interacting with them
            3. Add assertions to verify expected behaviors
            4. Add comments to explain the test steps
            5. Use Playwright best practices
            6. Handle potential errors gracefully
            7. Make sure to capture screenshots on failures
            
            The test should be executable with `npx playwright test` command.
            
            Please structure your code properly and include all necessary imports and configurations.
            """
        )
        
        if self.llm:
            self.code_chain = LLMChain(llm=self.llm, prompt=self.test_code_template)
    
    async def generate_test_code(self, test_data):
        """
        Generate Playwright test code from test data
        
        Args:
            test_data: Extracted test steps data
            
        Returns:
            str: Generated Playwright test code
        """
        if not self.llm:
            raise RuntimeError("LLM not initialized. Check OpenAI API key.")
        
        try:
            # Format test steps for prompt
            test_steps_str = json.dumps(test_data, indent=2)
            app_url = test_data.get("app_url", "https://example.com")
            
            # Run the LLM chain
            result = await self.code_chain.arun(
                test_steps=test_steps_str,
                app_url=app_url
            )
            
            # Extract code from the result
            code_start = result.find('```typescript')
            if code_start == -1:
                code_start = result.find('```ts')
            if code_start == -1:
                code_start = result.find('```')
                
            if code_start != -1:
                # Find the end of the code block
                code_start = result.find('\n', code_start) + 1
                code_end = result.find('```', code_start)
                if code_end != -1:
                    code = result[code_start:code_end].strip()
                else:
                    code = result[code_start:].strip()
            else:
                code = result
                
            return code
            
        except Exception as e:
            logger.error(f"Error generating test code: {e}")
            raise

async def generate_test_automation(test_steps_data):
    """
    Generate Playwright test automation code from test steps
    
    Args:
        test_steps_data: Extracted test steps data
        
    Returns:
        dict: Generated test code and metadata
    """
    generator = PlaywrightTestGenerator()
    
    try:
        # Generate test code
        test_code = await generator.generate_test_code(test_steps_data)
        
        # Generate test configuration
        test_name = test_steps_data.get("test_name", "Automated Test")
        test_file_name = test_name.lower().replace(" ", "_") + ".spec.ts"
        
        return {
            "test_name": test_name,
            "file_name": test_file_name,
            "code": test_code,
            "language": "typescript",
            "framework": "playwright"
        }
    except Exception as e:
        logger.error(f"Error in test automation generation: {e}")
        raise 