package main

import (
	"api/internal/middleware/auth"
	"api/internal/router"
	"api/pkg/db/postgres"
	"log"
	"os"

	valid "github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load("../../.env"); err != nil {
		log.Fatalf("Error loading .env file: %v", err.Error())
	}

	// Setup db connection
	postgres.ConnectDB()

	// Setup validation
	valid.SetFieldsRequiredByDefault(true)
	valid.SetNilPtrAllowedByRequired(true)

	// Set api mode
	switch env := os.Getenv("GO_ENV"); env {
	case "production":
		gin.SetMode(gin.ReleaseMode)
	case "test":
		gin.SetMode(gin.TestMode)
	default:
		gin.SetMode(gin.DebugMode)
	}

	// Initialize auth middleware
	auth, err := auth.New()
	if err != nil {
		log.Fatalf("Failed to initialize the authentication service: %v", err)
	}

	// Create router and start server
	router := router.New(auth)
	router.Run()
}
