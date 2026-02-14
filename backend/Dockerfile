FROM python:3.12

# Working directory set karein
WORKDIR /code

# Requirements copy aur install karein
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

RUN pip install -r requirements.txt

# Pura backend code copy karein
COPY . /code

# Hugging Face default port 7860 use karta hai
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]