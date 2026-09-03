@echo off
cd /d "%~dp0"
start "" "http://localhost:5500/teste.html"
python -m http.server 5500 --bind 0.0.0.0
pause
