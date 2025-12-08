@echo off
set /p username="Enter your username: "
cd /d "C:\Users\%username%\Documents\GitHub\webarchive"
echo Starting local web server at http://localhost:8000
python -m http.server 8000
pause