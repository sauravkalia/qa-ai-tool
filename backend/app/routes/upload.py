import boto3
import uuid
from fastapi import APIRouter, File, UploadFile, HTTPException
from botocore.exceptions import NoCredentialsError
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

# AWS Credentials
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

# Initialize S3 Client
s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY
)

@router.post("/upload/")
async def upload_video(file: UploadFile = File(...)):
    try:
        file_extension = file.filename.split(".")[-1]
        file_key = f"videos/{uuid.uuid4()}.{file_extension}"

        s3_client.upload_fileobj(file.file, S3_BUCKET_NAME, file_key)

        file_url = f"https://{S3_BUCKET_NAME}.s3.amazonaws.com/{file_key}"

        return {"message": "Upload successful", "file_url": file_url}
    except NoCredentialsError:
        raise HTTPException(status_code=500, detail="AWS credentials not found")