from fastapi import FastAPI
from app.routes.upload import router as upload_router

app = FastAPI(title="QA AI Tool Backend")

app.include_router(upload_router, prefix="/api")