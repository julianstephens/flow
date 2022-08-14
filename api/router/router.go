package router

import (
	"encoding/gob"

	"github.com/gin-gonic/gin"

	"api/internal/api/controller"
	"api/middleware/auth"
)

func New(auth *auth.AuthService) *gin.Engine {
	router := gin.Default()

	// Global middleware
	// Logger middleware will write the logs to gin.DefaultWriter even if you set with GIN_MODE=release.
	// By default gin.DefaultWriter = os.Stdout
	router.Use(gin.Logger())

	// Set content-type for all routes
	router.Use(JSONMiddleware())

	gob.Register(map[string]interface{}{})

	v1 := router.Group("/api")
	{
		v1.GET("/users/:id", controller.GetUser)
	}

	return router
}

func JSONMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Content-Type", "application/json")
		c.Next()
	}
}
