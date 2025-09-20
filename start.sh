#!/bin/bash

echo "Starting StudySync Application..."
echo
echo "================================"
echo "    Starting StudySync"
echo "================================"
echo

echo "[1/2] Starting Backend Server..."
cd backend
mvn spring-boot:run &
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 10

echo
echo "[2/2] Starting Frontend Development Server..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo
echo "Both servers are starting..."
echo "Backend: http://localhost:8080"
echo "Frontend: http://localhost:3000"
echo
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
wait
