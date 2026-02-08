from fastapi import HTTPException, Request, status
from fastapi.responses import JSONResponse

class CustomException(HTTPException):
    def __init__(self, status_code: int, code: str, message: str, detail: dict = None):
        super().__init__(status_code=status_code, detail=detail)
        self.code = code
        self.message = message
        self.detail = detail

async def http_exception_handler(request: Request, exc: CustomException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "code": exc.code,
            "message": exc.message,
            "detail": exc.detail,
        },
    )

async def validation_exception_handler(request: Request, exc: HTTPException):
    # This handler can be customized further for Pydantic Validation Errors etc.
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "code": "VALIDATION_ERROR",
            "message": "Invalid input provided.",
            "detail": exc.detail,
        },
    )
