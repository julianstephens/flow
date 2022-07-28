package routes

import (
	"api/internal/api/service/example"

	"github.com/gin-gonic/gin"
)

func Routes(router *gin.Engine) {
	v1 := router.Group("/v1")
	{
		{
			foo := v1.Group("/example")
			{
				foo.POST("/", example.CreateFoo)
			}
		}
	}
}
