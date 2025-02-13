package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mrde1v/jiri-lol/controller"
	"github.com/mrde1v/jiri-lol/middleware"
)

func ZamestnanciRoutes(zamestnanciGroup *gin.RouterGroup) {
	zamestnanciGroup.POST("/new", middleware.IsLoggedInAdminNoMessage(), controller.CreateZamestnanec)
	zamestnanciGroup.POST("/delete", middleware.IsLoggedInAdminNoMessage(), controller.DeleteZamestnanec)
	zamestnanciGroup.GET("/", controller.ListZamestnanci)
}
