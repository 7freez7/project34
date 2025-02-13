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

func ListZamestnanci(c *gin.Context) {
	var zamestnanci []models.Zamestnanci

	database.DB.Find(&zamestnanci)

	c.JSON(http.StatusOK, zamestnanci)
}

func CreateZamestnanec(c *gin.Context) {
	// Limit request to 50MB
	if err := c.Request.ParseMultipartForm(50 << 20); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse form data"})
		return
	}

	var body struct {
		Jmeno     string `form:"jmeno" binding:"required"`
		Vyucuje   string `form:"vyucuje" binding:"required"`
		Zivotopis string `form:"zivotopis"`
		Obor      string `form:"obor" binding:"required"`
	}

	if err := c.ShouldBind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	uploadDir := `C:\Users\nakla\Desktop\jiri-lol\jiri-lol\data\Zamestnanci`

	// Sanitize name
	safeJmeno := strings.NewReplacer(
		" ", "_", ":", "_", "/", "_", "\\", "_", "\"", "_", "<", "_",
		">", "_", "|", "_", "*", "_", "?", "_", ".", "_").Replace(body.Jmeno)
	if len(safeJmeno) > 255 {
		safeJmeno = safeJmeno[:255]
	}

	zamestnanciFolder := filepath.Join(uploadDir, safeJmeno)

	if err := os.MkdirAll(zamestnanciFolder, os.ModePerm); err != nil {
		log.Printf("Failed to create directory: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create folder"})
		return
	}

	var imagePaths []string
	for i := 0; i < 4; i++ {
		fileKey := fmt.Sprintf("image%d", i)

		file, header, err := c.Request.FormFile(fileKey)
		if err == http.ErrMissingFile {
			continue
		}
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Error processing %s: %v", fileKey, err)})
			return
		}
		defer file.Close()

		imagePath := filepath.Join(zamestnanciFolder, header.Filename)
		out, err := os.Create(imagePath)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to save %s", fileKey)})
			return
		}
		defer out.Close()

		if _, err = io.Copy(out, file); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to write %s", fileKey)})
			return
		}

		imagePaths = append(imagePaths, imagePath)
	}

	// Convert image paths to relative paths
	basePath := uploadDir
	for i, imagePath := range imagePaths {
		relativePath := strings.Replace(imagePath, basePath, "", 1)
		relativePath = strings.ReplaceAll(relativePath, "\\", "/")
		imagePaths[i] = relativePath
	}

	imagePathsStr := strings.Join(imagePaths, ",")

	zamestnanci := models.Zamestnanci{
		Jmeno:     body.Jmeno,
		Vyucuje:   body.Vyucuje,
		Zivotopis: body.Zivotopis,
		Obor:      body.Obor,
		Image:     imagePathsStr,
	}

	if err := database.DB.Create(&zamestnanci).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create zamestnanec"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":     "Zamestnanec created",
		"zamestnanec": zamestnanci,
	})
}

func DeleteZamestnanec(c *gin.Context) {
	var body struct {
		Jmeno string `json:"jmeno" binding:"required"`
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	var zamestnanci models.Zamestnanci

	result := database.DB.Where("Jmeno = ?", body.Jmeno).Find(&zamestnanci)
	if result.RowsAffected < 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Zamestnanec not found"})
		return
	}

	database.DB.Delete(&zamestnanci)

	c.JSON(http.StatusOK, gin.H{
		"message": "Zamestnanec deleted",
	})
}
