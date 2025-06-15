@echo off
echo Parando os servidores da aplicacao...
echo.

echo Encontrando processos nas portas 3000 e 3001...

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo Parando processo na porta 3000 (PID: %%a)
    taskkill /PID %%a /F > nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001') do (
    echo Parando processo na porta 3001 (PID: %%a)
    taskkill /PID %%a /F > nul 2>&1
)

echo.
echo Parando processos Node.js relacionados ao projeto...
taskkill /F /IM node.exe > nul 2>&1
taskkill /F /IM serve.exe > nul 2>&1

echo.
echo ============================================
echo  SERVIDORES PARADOS COM SUCESSO!
echo ============================================
echo.
pause
