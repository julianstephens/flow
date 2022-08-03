package main

import (
	"api/routes"
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
	routes.Routes(router)
	router.Run()
}
