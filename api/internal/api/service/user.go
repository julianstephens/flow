package user

import (
	client "api/internal/database/postgres"
	"api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

type CreateUserInput struct {
	Name string `json:"name" binding:"required"`
}

func CreateUser(c *gin.Context) {
	var input CreateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	foo := models.Foo{Name: input.Name}
	client.DB.Create(&foo)

	c.JSON(http.StatusOK, gin.H{"data": foo})
}
