package user

import (
	ctrl "api/internal/api/controller"
	"api/internal/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

var user ctrl.User

func CreateUser(c *gin.Context) {
	var req models.CreateUserInput
	c.BindJSON(&req)

	res, err := user.CreateUser(req)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"data": &res, "message": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": &res, "message": "Created."})
}

func GetUser(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	res, err := user.GetUser(id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"data": &res, "message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": &res, "message": "Retrieved."})
}
func UpdateUser(c *gin.Context) {
	var req models.CreateUserInput
	c.BindJSON(&req)
	id, _ := strconv.Atoi(c.Param("id"))
	res, err := user.UpdateUser(req, id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"data": &res, "message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": &res, "message": "Updated."})
}
func DeleteUser(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	_, err := user.DeleteUser(id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"data": id, "message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id, "message": "Deleted."})
}
