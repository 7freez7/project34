package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mrde1v/jiri-lol/controller"
	"github.com/mrde1v/jiri-lol/middleware"
)

func UserRoutes(usersGroup *gin.RouterGroup) {
	usersGroup.POST("/changepassword", middleware.IsLoggedIn(), controller.ChangePassword)
	usersGroup.POST("/create", middleware.IsLoggedInAdminNoMessage(), controller.CreateUser)
	usersGroup.POST("/delete", middleware.IsLoggedInAdminNoMessage(), controller.DeleteUser)
}
