package user

import (
	ctrl "api/internal/api/controller"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// func CreateUser(c *gin.Context) {
// }

var user ctrl.User

func GetUser(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	res, err := ctrl.User.GetUser(user, id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"data": &res, "message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": &res, "message": "Retrieved."})
}
