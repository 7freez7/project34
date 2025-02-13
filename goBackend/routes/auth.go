package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mrde1v/jiri-lol/controller"
	"github.com/mrde1v/jiri-lol/middleware"
)

func AuthRoutes(authGroup *gin.RouterGroup) {
	authGroup.POST("/login", controller.Login)
	authGroup.GET("/validate", middleware.IsLoggedIn(), controller.Validate)
	authGroup.GET("/validateadmin", middleware.IsLoggedInAdmin())
}
