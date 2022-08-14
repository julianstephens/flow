package main

import (
	"api/internal/database/postgres"
	"api/middleware/auth"
	"api/router"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load("../../.env"); err != nil {
		log.Fatalf("Error loading .env file: %v", err.Error())
	}

	postgres.ConnectDB()

	switch env := os.Getenv("GO_ENV"); env {
	case "production":
		gin.SetMode(gin.ReleaseMode)
	case "test":
		gin.SetMode(gin.TestMode)
	default:
		gin.SetMode(gin.DebugMode)
	}

	auth, err := auth.New()
	if err != nil {
		log.Fatalf("Failed to initialize the authentication service: %v", err)
	}

	router := router.New(auth)

	router.Run()
}
