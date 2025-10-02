
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

# Base de datos
pip install psycopg2-binary==2.9.9
pip install alembic==1.12.1

# Paquetes específicos de TiBACK
pip install PyJWT==2.8.0
pip install requests==2.31.0
pip install python-socketio==5.8.0
pip install google-cloud-vision==3.4.4
pip install cloudinary==1.36.0

# Otros paquetes necesarios
pip install gunicorn==21.2.0
pip install python-dotenv==1.0.0

# ===== MIGRACIONES =====
flask db upgrade


