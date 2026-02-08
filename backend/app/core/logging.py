import logging
import sys
from uuid import uuid4

def configure_logging():
    logging.basicConfig(
        level=logging.INFO,
        format='{"time": "%(asctime)s", "level": "%(levelname)s", "message": "%(message)s", "correlation_id": "%(correlation_id)s"}',
        handlers=[
            logging.StreamHandler(sys.stdout)
        ]
    )
    # Add a filter to inject correlation_id if not present
    class CorrelationIdFilter(logging.Filter):
        def filter(self, record):
            if not hasattr(record, 'correlation_id'):
                record.correlation_id = str(uuid4()) # Generate a new one if not set
            return True
    
    logging.getLogger().addFilter(CorrelationIdFilter())

# Example usage:
# import logging
# logger = logging.getLogger(__name__)
# logger.info("This is a structured log message", extra={"correlation_id": "some-request-id"})
# logger.warning("Another log message")