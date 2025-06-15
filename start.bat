@echo off
echo ==================================================
echo      INICIANDO LEO TECH APLICACAO (FRONTEND + BACKEND)
echo ==================================================
echo.

echo Instalando dependencias do backend...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Erro ao instalar dependencias do backend
    pause
    exit /b 1
)

echo.
echo Navegando para o diretorio do frontend...
cd ..\frontend
echo.

echo Instalando dependencias do frontend...
call npm install
if %errorlevel% neq 0 (
    echo Erro ao instalar dependencias do frontend
    pause
    exit /b 1
)

echo.
echo Construindo o frontend...
call npm run build
if %errorlevel% neq 0 (
    echo Erro ao construir o frontend
    pause
    exit /b 1
)

echo.
echo Iniciando o servidor backend...
cd ..\backend
start "Leo Tech Backend" cmd /k "node src/app.js"

echo.
echo Aguardando o backend iniciar...
timeout /t 3 /nobreak > nul

echo.
echo Iniciando o servidor frontend...
cd ..\frontend
echo A aplicacao estara disponivel em: http://localhost:3000
echo O backend estara disponivel em: http://localhost:3001
echo.
echo Para encerrar os servidores, pressione CTRL+C nos terminais respectivos.
echo.
start "Leo Tech Frontend" cmd /k "npx -y serve -s build -l 3000 --single"

echo.
echo Aguardando o servidor iniciar...
timeout /t 3 /nobreak > nul

echo.
echo Abrindo a aplicacao no navegador...
start http://localhost:3000

echo.
echo ============================================
echo  LEO TECH INICIADA COM SUCESSO!
echo ============================================
echo  Frontend: http://localhost:3000
echo  Backend:  http://localhost:3001
echo ============================================
echo.
echo Para fechar este assistente, pressione qualquer tecla...
echo (O servidor continuara rodando na outra janela)
pause > nul
