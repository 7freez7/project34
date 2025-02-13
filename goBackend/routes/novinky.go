package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mrde1v/jiri-lol/controller"
	"github.com/mrde1v/jiri-lol/middleware"
)

func NovinkyRoutes(novinkyGroup *gin.RouterGroup) {
	novinkyGroup.GET("/", controller.ListNovinky)
	novinkyGroup.POST("/get", controller.GetNovinka)
	{
		novinkyGroup.POST("/create", middleware.IsLoggedIn(), controller.CreateNovinka)
		novinkyGroup.POST("/update", middleware.IsLoggedIn(), controller.UpdateNovinka)
		novinkyGroup.POST("/delete", middleware.IsLoggedIn(), controller.DeleteNovinka)
	}
}
