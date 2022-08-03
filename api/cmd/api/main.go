package main

import (
	"fmt"
	"net/http"
	"time"

	"api/utils"

	"github.com/gin-gonic/gin"
)

func main() {
	switch env := utils.GodotEnv("GO_ENV"); env {
	case "production":
		gin.SetMode(gin.ReleaseMode)
	case "test":
		gin.SetMode(gin.TestMode)
	default:
		gin.SetMode(gin.DebugMode)
	}

	router := gin.Default()

	startServer(router)
}

func startServer(router http.Handler) {
	port := fmt.Sprintf(":%s", utils.GodotEnv("PORT"))
	server := &http.Server{
		Addr:         port,
		Handler:      router,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}
	server.ListenAndServe()
}
