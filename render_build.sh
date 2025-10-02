#!/usr/bin/env bash
# exit on error
set -o errexit

# ===== FRONTEND (Node.js) =====
npm install
npm install socket.io-client@4.7.4
npm install @cloudinary/react @cloudinary/url-gen
npm install --save @google-cloud/speech
npm install @react-google-maps/api
npm run build

# ===== BACKEND (Python) =====
pip install --upgrade pip

# Paquetes básicos de Flask
pip install flask==2.3.3
pip install flask-sqlalchemy==3.0.5
pip install flask-migrate==4.0.5
pip install flask-cors==4.0.0
pip install flask-admin==1.6.1
pip install flask-swagger==0.2.14

# Dependencias core de Flask
pip install werkzeug==2.3.7
pip install jinja2==3.1.2
pip install itsdangerous==2.1.2
pip install click==8.1.7
pip install markupsafe==2.1.3

# Base de datos
pip install psycopg2-binary==2.9.9
pip install alembic==1.12.1
pip install sqlalchemy==2.0.23

# Paquetes específicos de TiBACK
pip install PyJWT==2.8.0
pip install requests==2.31.0
pip install python-socketio==5.8.0
pip install flask-socketio==5.3.6
pip install google-cloud-vision==3.4.4
pip install cloudinary==1.36.0

# Dependencias adicionales para Socket.IO y Google Cloud
pip install python-engineio==4.7.1
pip install eventlet==0.33.3
pip install dnspython==2.4.2

# Dependencias para autenticación JWT
pip install flask-jwt-extended==4.6.0

# Otros paquetes necesarios
pip install gunicorn==21.2.0
pip install python-dotenv==1.0.0
pip install six==1.16.0
pip install typing-extensions==4.8.0

# Dependencias para manejo de fechas y utilidades
pip install python-dateutil==2.8.2
pip install pytz==2023.3

# Dependencias para formularios (si usas WTForms)
pip install wtforms==3.1.0

# ===== MIGRACIONES =====
flask db upgrade
