@echo off
cd /d C:\Users\User
echo Running deploy from: %CD%
echo.|
call "%~dp0deploy.bat"
