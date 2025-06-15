@echo off
echo ============================================
echo  INSTALACAO INICIAL DO PROJETO FULL STACK
echo ============================================
echo.

echo Verificando se o Node.js esta instalado...
node --version > nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado!
    echo Por favor, instale o Node.js em https://nodejs.org/
    pause
    exit /b 1
)

echo Verificando se o npm esta instalado...
npm --version > nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: npm nao encontrado!
    pause
    exit /b 1
)

echo Node.js e npm encontrados!
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
echo Instalando dependencias do frontend...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo Erro ao instalar dependencias do frontend
    pause
    exit /b 1
)

echo.
echo Configurando o banco de dados...
cd ..\backend
node update-db.js
if %errorlevel% neq 0 (
    echo Erro ao configurar o banco de dados
    pause
    exit /b 1
)

echo.
echo ============================================
echo  INSTALACAO CONCLUIDA COM SUCESSO!
echo ============================================
echo.
echo Para iniciar a aplicacao:
echo   - Execute "start.bat" para modo producao
echo   - Execute "dev.bat" para modo desenvolvimento
echo.
echo Para parar os servidores:
echo   - Execute "stop.bat"
echo.
pause
