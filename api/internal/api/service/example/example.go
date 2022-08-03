package example

import (
	"api/internal/api/models"
	client "api/internal/database/postgres"
	"net/http"

	"github.com/gin-gonic/gin"
)

type CreateFooInput struct {
	Name string `json:"name" binding:"required"`
}

func HelloWorld(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Hello, world!"})
}

func CreateFoo(c *gin.Context) {
	var input CreateFooInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	foo := models.Foo{Name: input.Name}
	client.DB.Create(&foo)

	c.JSON(http.StatusOK, gin.H{"data": foo})
}
