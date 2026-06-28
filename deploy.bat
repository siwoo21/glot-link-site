@echo off
echo === 홈페이지 업데이트를 시작합니다 ===
git add .
git commit -m "Auto Update %date% %time%"
git push
echo === 업데이트 완료! 10초 뒤 홈페이지를 확인하세요 ===
pause