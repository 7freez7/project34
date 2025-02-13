package controller

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/mrde1v/jiri-lol/database"
	"github.com/mrde1v/jiri-lol/database/models"
)

func ListNovinky(c *gin.Context) {
	var novinky []models.Novinka

	database.DB.Find(&novinky)

	c.JSON(http.StatusOK, novinky)
}

func GetNovinka(c *gin.Context) {
	var body struct {
		ID uint `json:"id" binding:"required"`
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	var novinka models.Novinka

	result := database.DB.Where("id = ?", body.ID).Find(&novinka)
	if result.RowsAffected < 1 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Novinka not found"})
		return
	}

	c.JSON(http.StatusOK, novinka)
}

func CreateNovinka(c *gin.Context) {
	// Set the file size limit to 50MB
	if err := c.Request.ParseMultipartForm(50 << 20); err != nil { // 50 MB limit
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse form data"})
		return
	}

	// Define the expected form body structure
	var body struct {
		Title   string `form:"title" binding:"required"`
		Content string `form:"content" binding:"required"`
	}

	uploadDir := `C:\Users\nakla\Desktop\jiri-lol\jiri-lol\data\Novinky`

	// Bind the form values to the body struct
	if err := c.ShouldBind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Create a folder named after the novinka title (sanitize the title to avoid illegal characters in the folder name)
	safeTitle := strings.NewReplacer(
		" ", "_", ":", "_", "/", "_", "\\", "_", "\"", "_", "<", "_", ">", "_", "|", "_", "*", "_", "?", "_", ".", "_").Replace(body.Title)

	// Remove any characters that Windows does not allow in folder names
	forbiddenChars := []string{"/", "\\", ":", "*", "?", "\"", "<", ">", "|"}
	for _, char := range forbiddenChars {
		safeTitle = strings.ReplaceAll(safeTitle, char, "_")
	}

	// Ensure the title doesn't exceed Windows path length limitations
	if len(safeTitle) > 255 {
		safeTitle = safeTitle[:255]
	}

	novinkaFolder := filepath.Join(uploadDir, safeTitle)

	// Ensure the directory exists
	err := os.MkdirAll(novinkaFolder, os.ModePerm)
	if err != nil {
		log.Printf("Failed to create directory: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to create novinka folder: %v", err)})
		return
	}

	// Process uploaded images (up to 4 files)
	var imagePaths []string
	for i := 0; i < 4; i++ {
		fileKey := fmt.Sprintf("image%d", i) // Generate file key like image0, image1, etc.

		// Get the uploaded file
		file, header, err := c.Request.FormFile(fileKey)
		if err == http.ErrMissingFile {
			// No file uploaded for this key, continue to the next
			continue
		}
		if err != nil {
			// Handle unexpected errors with file upload
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Error processing %s: %v", fileKey, err)})
			return
		}

		defer file.Close()

		// Create an absolute path for the file within the novinka folder
		imagePath := filepath.Join(novinkaFolder, header.Filename)

		// Create the file on disk
		out, err := os.Create(imagePath)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to save %s", fileKey)})
			return
		}
		defer out.Close()

		// Copy the uploaded file content into the new file
		_, err = io.Copy(out, file)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to save %s", fileKey)})
			return
		}

		// Append the file path to the imagePaths array
		imagePaths = append(imagePaths, imagePath)
	}

	// Base path to be replaced with a relative path
	basePath := `C:\Users\nakla\Desktop\jiri-lol\jiri-lol\data\Novinky\`

	// Adjust image paths to remove the base path and ensure no leading slash
	for i, imagePath := range imagePaths {
		// Replace the base path with a relative path and ensure no leading slash
		relativePath := strings.Replace(imagePath, basePath, "", 1) // Remove the base path
		relativePath = strings.ReplaceAll(relativePath, "\\", "/")  // Replace backslashes with forward slashes
		imagePaths[i] = relativePath
	}

	// Join the modified image paths into a comma-separated string
	imagePathsStr := strings.Join(imagePaths, ",")

	// Retrieve user info from the context (assuming you have user info in context)
	user, _ := c.Get("user")
	userData := user.(models.User)

	// Create the Novinka entry in the database
	novinka := models.Novinka{
		Title:   body.Title,
		Content: body.Content,
		Author:  userData.Username,
		Image:   imagePathsStr, // Store the relative paths as a comma-separated string
	}

	// Save to database
	if err := database.DB.Create(&novinka).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create Novinka"})
		return
	}

	// Return success response
	c.JSON(http.StatusOK, gin.H{
		"message": "Novinka created",
		"novinka": novinka,
	})
}

func UpdateNovinka(c *gin.Context) {
	var body struct {
		ID      uint   `json:"id" binding:"required"`
		Title   string `json:"title" binding:"required"`
		Content string `json:"content" binding:"required"`
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	var novinka models.Novinka

	result := database.DB.Where("id = ?", body.ID).Find(&novinka)
	if result.RowsAffected < 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Novinka not found"})
	}

	user, _ := c.Get("user")
	userData := user.(models.User)

	if body.Title != "" {
		novinka.Title = body.Title
	}
	if body.Content != "" {
		novinka.Content = body.Content
	}

	novinka.AuthorLastUpdate = userData.Username

	database.DB.Save(&novinka)

	c.JSON(http.StatusOK, gin.H{
		"message": "Novinka updated",
	})
}

func DeleteNovinka(c *gin.Context) {
	var body struct {
		Title string `json:"title" binding:"required"`
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	var novinka models.Novinka

	result := database.DB.Where("title = ?", body.Title).Find(&novinka)
	if result.RowsAffected < 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Novinka not found"})
	}

	database.DB.Delete(&novinka)

	c.JSON(http.StatusOK, gin.H{
		"message": "Novinka deleted",
	})
}
