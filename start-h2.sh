#!/bin/bash
echo "Starting StudySync with H2 Database (No PostgreSQL Required)..."

echo ""
echo "=========================================="
echo "   Starting StudySync with H2 Database"
echo "=========================================="
echo ""
echo "This version runs with an in-memory H2 database"
echo "No PostgreSQL installation required!"
echo ""

echo "[1/2] Starting Backend Server with H2..."
cd backend
gnome-terminal --title="StudySync Backend (H2)" -- bash -c "mvn spring-boot:run -Dspring-boot.run.profiles=h2; exec bash" &

echo "Waiting for backend to start..."
sleep 10

echo ""
echo "[2/2] Starting Frontend Development Server..."
cd ../frontend
gnome-terminal --title="StudySync Frontend" -- bash -c "npm start; exec bash" &

echo ""
echo "Both servers are starting..."
echo "Backend: http://localhost:8080"
echo "Frontend: http://localhost:3000"
echo "H2 Database Console: http://localhost:8080/h2-console"
echo ""
echo "H2 Database Connection Details:"
echo "JDBC URL: jdbc:h2:mem:studysync"
echo "Username: sa"
echo "Password: (leave empty)"
echo ""
echo "Press Enter to continue..."
read