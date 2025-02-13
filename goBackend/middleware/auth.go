package middleware

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"github.com/mrde1v/jiri-lol/database"
	"github.com/mrde1v/jiri-lol/database/models"
)

func IsLoggedIn() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")

		jwtSecret := os.Getenv("JWT_SECRET")

		var user models.User

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}

			return []byte(jwtSecret), nil
		})
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			c.Abort()
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			if float64(time.Now().Unix()) > claims["exp"].(float64) {
				c.JSON(http.StatusUnauthorized, gin.H{
					"error": "Token expired",
				})
				c.Abort()
				return
			}

			result := database.DB.Where("id = ?", claims["sub"]).Find(&user)
			if result.RowsAffected < 1 {
				c.JSON(http.StatusUnauthorized, gin.H{
					"error": "User not found",
				})
				c.Abort()
				return
			}

			c.Set("user", user)
			c.Next()
			return
		}

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid token",
		})
		c.Abort()
	}
}

func IsLoggedInAdmin() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 1. Extract the token from the Authorization header
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token missing"})
			c.Abort()
			return
		}

		// 2. Parse the JWT token
		jwtSecret := os.Getenv("JWT_SECRET")
		var user models.User

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(jwtSecret), nil
		})

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			c.Abort()
			return
		}

		// 3. Check the claims of the token
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		// Check if the token has expired
		exp, ok := claims["exp"].(float64)
		if !ok || float64(time.Now().Unix()) > exp {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token expired"})
			c.Abort()
			return
		}

		// 4. Extract the "sub" claim and convert it to a string
		userID := ""
		switch v := claims["sub"].(type) {
		case string:
			userID = v
		case float64:
			userID = fmt.Sprintf("%.0f", v) // Convert float64 to string
		default:
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID in token"})
			c.Abort()
			return
		}

		// Look for the user in the database
		result := database.DB.Where("id = ?", userID).First(&user)
		if result.RowsAffected < 1 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
			c.Abort()
			return
		}

		// 5. Check if the user has admin permissions
		if user.Permissions == "admin" { // Assuming "admin" is the permission identifier
			// User is admin, return 200 OK
			c.JSON(http.StatusOK, gin.H{"message": "User is an admin"})
			c.Next()
		} else {
			// User is not admin, return 403 Forbidden
			c.JSON(http.StatusForbidden, gin.H{"message": "User is not an admin"})
			c.Abort()
		}
	}
}

func IsLoggedInAdminNoMessage() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 1. Extract the token from the Authorization header
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token missing"})
			c.Abort()
			return
		}

		// 2. Parse the JWT token
		jwtSecret := os.Getenv("JWT_SECRET")
		var user models.User

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(jwtSecret), nil
		})

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			c.Abort()
			return
		}

		// 3. Check the claims of the token
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		// Check if the token has expired
		exp, ok := claims["exp"].(float64)
		if !ok || float64(time.Now().Unix()) > exp {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token expired"})
			c.Abort()
			return
		}

		// 4. Extract the "sub" claim and convert it to a string
		userID := ""
		switch v := claims["sub"].(type) {
		case string:
			userID = v
		case float64:
			userID = fmt.Sprintf("%.0f", v) // Convert float64 to string
		default:
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID in token"})
			c.Abort()
			return
		}

		// Look for the user in the database
		result := database.DB.Where("id = ?", userID).First(&user)
		if result.RowsAffected < 1 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
			c.Abort()
			return
		}

		// 5. Check if the user has admin permissions
		if user.Permissions == "admin" { // Assuming "admin" is the permission identifier
			// User is admin, return 200 OK
			//c.JSON(http.StatusOK, gin.H{"message": "User is an admin"})
			c.Next()
		} else {
			// User is not admin, return 403 Forbidden
			//c.JSON(http.StatusForbidden, gin.H{"message": "User is not an admin"})
			c.Abort()
		}
	}
}
