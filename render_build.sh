#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

pip install --upgrade pip
pip install psycopg2-binary==2.9.9
pip install -r requirements.txt --no-deps
pip install flask flask-sqlalchemy flask-migrate flask-cors gunicorn python-dotenv

flask db upgrade
