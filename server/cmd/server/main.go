package main

import (
	"github.com/gin-gonic/gin"
	"github.com/julianstephens/budget-tracker/server/utils"
)

func main() {
	router := gin.Default()

	switch env := utils.GodotEnv("GO_ENV"); env {
	case "production":
		gin.SetMode(gin.ReleaseMode)
	case "test":
		gin.SetMode(gin.TestMode)
	default:
		gin.SetMode(gin.DebugMode)
	}
}
