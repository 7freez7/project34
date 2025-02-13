package main

import (
	"flag"
	"fmt"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/mrde1v/jiri-lol/database"
	"github.com/mrde1v/jiri-lol/database/models"
	"github.com/mrde1v/jiri-lol/routes"
	"golang.org/x/crypto/bcrypt"
)

func main() {
	addUser := flag.Bool("adduser", false, "Add a new user")

	flag.Parse()

	if godotenv.Load() != nil {
		panic("Error loading .env file")
	}

	if database.Init() != nil {
		panic("Error initializing database")
	}

	if database.Sync() != nil {
		panic("Error syncing database")
	}

	if *addUser {
		var username string
		var password string
		fmt.Print("Enter username: ")
		fmt.Scanln(&username)
		fmt.Print("Enter password: ")
		fmt.Scanln(&password)

		hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
		if err != nil {
			panic(err)
		}

		newUser := models.User{
			Username:    username,
			Password:    string(hash),
			Permissions: "admin",
		}

		database.DB.Create(&newUser)
		fmt.Println("User created!")
		return
	}

	if os.Getenv("DEBUG") == "false" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Content-Length", "Accept-Encoding", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.SetTrustedProxies([]string{"127.0.0.1", os.Getenv("TRUSTED_PROXY")})

	mainGroup := r.Group("/api")
	routes.Init(mainGroup)

	if err := r.Run(":" + os.Getenv("PORT")); err != nil {
		panic(err)
	}
}
