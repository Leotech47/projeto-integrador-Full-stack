@echo off
echo ==================================================
echo      INICIANDO LEO TECH APLICACAO FRONTEND
echo ==================================================
echo.

echo Navegando para o diretorio do frontend...
cd frontend
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
echo Iniciando o servidor frontend...
echo A aplicacao estara disponivel em: http://localhost:3000
echo.
echo Para encerrar o servidor, pressione CTRL+C no terminal do servidor.
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
echo  Acesse: http://localhost:3000
echo ============================================
echo.
echo Para fechar este assistente, pressione qualquer tecla...
echo (O servidor continuara rodando na outra janela)
pause > nul
