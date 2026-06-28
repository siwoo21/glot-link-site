@echo off
chcp 65001 >nul
title GLOT-Link Auto Deployer
echo ===================================================
echo   [GLOT-Link] 홈페이지 업데이트 및 배포를 시작합니다.
echo ===================================================
echo.

:: 1. 변경된 파일 담기
echo 1. 변경된 파일들을 임시 보관함에 담는 중...
git add .
if %errorlevel% neq 0 goto ERROR

:: 2. 저장 기록 남기기 (현재 날짜/시간 자동 기록)
echo 2. 업데이트 기록 생성 중...
git commit -m "Auto update: %date% %time%"
if %errorlevel% neq 0 (
    echo [안내] 새로 수정된 내용이 없습니다. 바로 push를 시도합니다.
)

:: 3. 깃허브로 전송
echo 3. 깃허브 저장소로 전송 중 (Vercel 자동 배포 트리거)...
git push origin main
if %errorlevel% neq 0 goto ERROR

echo.
echo ===================================================
echo   ★ 배포 완료! 10초 뒤 홈페이지를 확인하세요.
echo ===================================================
goto END

:ERROR
echo.
echo ❌ 에러가 발생했습니다. Cursor AI 터미널 창을 확인해 주세요.
echo.

:END
pause