package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mrde1v/jiri-lol/controller"
	"github.com/mrde1v/jiri-lol/middleware"
)

func PrihlaskyRoutes(prihlaskyGroup *gin.RouterGroup) {
	prihlaskyGroup.GET("/", controller.ListPrihlaska)
	prihlaskyGroup.GET("/valid", controller.Valid)
	prihlaskyGroup.POST("/prihlaska", controller.CreatePrihlaska)
	prihlaskyGroup.GET("/excel", middleware.IsLoggedInAdmin(), controller.ExcelPrihlasky)
	prihlaskyGroup.POST("/primacirizeni", middleware.IsLoggedInAdminNoMessage(), controller.ProcessPrihlaskaTimes)
	prihlaskyGroup.GET("/konec", middleware.IsLoggedInAdminNoMessage(), controller.StopPrijimacky)
	prihlaskyGroup.Static("/public", `C:\Users\nakla\Desktop\project34-main\public`)
	prihlaskyGroup.GET("/vdata", controller.GetVData)
	prihlaskyGroup.GET("/hdata", controller.GetHData)
	prihlaskyGroup.GET("/tdata", controller.GetTData)
	prihlaskyGroup.POST("/dasdass", controller.Prihlaska)
}
