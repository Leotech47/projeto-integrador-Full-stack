@echo off
echo Iniciando o projeto em modo de desenvolvimento...
echo.

echo Verificando se as dependencias estao instaladas...
cd backend
if not exist node_modules (
    echo Instalando dependencias do backend...
    call npm install
)

cd ..\frontend
if not exist node_modules (
    echo Instalando dependencias do frontend...
    call npm install
)

echo.
echo Iniciando o backend em modo desenvolvimento...
cd ..\backend
start "Backend Dev Server" cmd /k "npx nodemon src/app.js"

echo Aguardando o backend inicializar...
timeout /t 3 /nobreak > nul

echo.
echo Iniciando o frontend em modo desenvolvimento...
cd ..\frontend
start "Frontend Dev Server" cmd /k "npx react-scripts start"

echo.
echo Aguardando os servidores iniciarem...
timeout /t 8 /nobreak > nul

echo.
echo ============================================
echo  MODO DESENVOLVIMENTO INICIADO!
echo ============================================
echo  Frontend: http://localhost:3000 (auto-reload)
echo  Backend:  http://localhost:3001 (auto-reload)
echo ============================================
echo.
echo Os servidores foram iniciados em janelas separadas.
echo Feche as janelas para parar os servidores.
echo.
pause
