FROM python:3.10-slim-bullseye as requirements-stage

WORKDIR /tmp
RUN python -m pip install "poetry==1.4.2"
COPY ./pyproject.toml ./poetry.lock* /tmp/
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

FROM python:3.10-slim-bullseye
WORKDIR /app
# install weasyprint's dependencies
RUN  apt-get update -qq \
    && apt-get install --no-install-recommends -y \
    libpango1.0
COPY --from=requirements-stage /tmp/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt
COPY ./docker/start.sh /start.sh
RUN chmod +x /start.sh
COPY ./docker/gunicorn_conf.py /gunicorn_conf.py
COPY . /app
ENV PYTHONPATH=/app

EXPOSE 80

ENTRYPOINT ["/start.sh"]