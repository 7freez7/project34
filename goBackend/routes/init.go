package routes

import (
	"github.com/gin-gonic/gin"
)

func Init(r *gin.RouterGroup) {
	// Other route groups for authentication, novinky, and users
	authGroup := r.Group("/auth")
	novinkyGroup := r.Group("/novinky")
	usersGroup := r.Group("/users")
	prihlaskyGroup := r.Group("/prihlasky")
	zamestnanciGroup := r.Group("/zamestanci")

	// Initialize routes for each group
	ZamestnanciRoutes(zamestnanciGroup)
	AuthRoutes(authGroup)
	NovinkyRoutes(novinkyGroup)
	UserRoutes(usersGroup)
	PrihlaskyRoutes(prihlaskyGroup)
}
