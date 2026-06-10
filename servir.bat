@echo off
REM Arranca un servidor HTTP local para evitar los warnings de file:// en Chromium.
REM Doble clic sobre este archivo y abre http://localhost:8000 en el navegador.

cd /d "%~dp0"
echo Sirviendo en http://localhost:8000  (Ctrl+C para parar)
start "" "http://localhost:8000"
python -m http.server 8000
