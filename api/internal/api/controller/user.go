package controller

import (
	client "api/internal/database/postgres"
	"api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

var user models.User

func GetUser(c *gin.Context) {
	id := c.Param("id")

	if err := client.DB.Unscoped().Find(&user, id).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"data": nil, "message": "The user you're looking for could not be found."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user, "message": "Retrieved."})
}
