package controller

import (
	"fmt"
	"log"
	"net/http"
	"reflect"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mrde1v/jiri-lol/database"
	"github.com/mrde1v/jiri-lol/database/models"
	"github.com/xuri/excelize/v2"
)

func ListPrihlaska(c *gin.Context) {
	var prihlasky []models.Prihlaska

	database.DB.Find(&prihlasky)

	c.JSON(http.StatusOK, prihlasky)
}

func CreatePrihlaska(c *gin.Context) {
	var body struct {
		Obor            string `form:"obor" binding:"required"`
		JmenoZaka       string `form:"jmenoZaka" binding:"required"`
		DatumNarozeni   string `form:"datumNarozeni" binding:"required"`
		MistoNarozeni   string `form:"mistoNarozeni" binding:"required"`
		StatniObcanstvi string `form:"statniObcanstvi" binding:"required"`
		TrvalyPobyt     string `form:"trvalyPobyt" binding:"required"`
		TelefonRodic    string `form:"telefonRodic" binding:"required"`
		ZakonyZastupce  string `form:"zakonyZastupce" binding:"required"`
		Email           string `form:"email" binding:"required"`
	}

	if err := c.ShouldBind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Define the model for the database
	newPrihlaska := models.Prihlaska{
		Obor:            body.Obor,
		JmenoZaka:       body.JmenoZaka,
		DatumNarozeni:   body.DatumNarozeni,
		MistoNarozeni:   body.MistoNarozeni,
		StatniObcanstvi: body.StatniObcanstvi,
		TrvalyPobyt:     body.TrvalyPobyt,
		TelefonRodic:    body.TelefonRodic,
		ZakonyZastupce:  body.ZakonyZastupce,
		Email:           body.Email,
		CreatedAt:       time.Now(), // Set current timestamp
	}

	// Insert the new record into the database
	if err := database.DB.Create(&newPrihlaska).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to create prihlaska"})
		return
	}

	c.JSON(200, gin.H{"message": "Prihlaska created successfully"})
}

func ExcelPrihlasky(c *gin.Context) {
	// Clear the database table
	if err := database.DB.Exec("DELETE FROM prihlaska_times").Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("failed to clear database: %v", err)})
		return
	}
	// Načti data z databáze
	var prihlasky []models.Prihlaska
	database.DB.Find(&prihlasky)

	// Definuj hlavičky (bez "Obor")
	headers := []string{
		"Jmeno Zaka", "Datum Narozeni", "Misto Narozeni", "Statni Obcanstvi",
		"Trvaly Pobyt", "Telefon Rodic", "Zakony Zastupce", "Email",
	}

	// Definuj obory a jejich soubory
	obory := map[string]string{
		"hudební":  `C:\Users\nakla\Desktop\projekt\jiri-lol\jiri-lol\hudebni.xlsx`,
		"výtvarný": `C:\Users\nakla\Desktop\projekt\jiri-lol\jiri-lol\vytvarny.xlsx`,
		"taneční":  `C:\Users\nakla\Desktop\projekt\jiri-lol\jiri-lol\tanecni.xlsx`,
	}

	// Pro každý obor vytvoř samostatný Excel soubor
	for oborKey, filePath := range obory {
		// Vytvoř nový Excel soubor
		f := excelize.NewFile()

		// Bezpodmínečně odstraň "Sheet1"
		if err := f.DeleteSheet("Sheet1"); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete default sheet"})
			return
		}

		// Vytvoř nový list a přejmenuj ho na "Data"
		sheetName := "Data"
		index, err := f.NewSheet(sheetName)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create new sheet"})
			return
		}
		f.SetActiveSheet(index)

		// Zapiš hlavičky na první řádek
		for i, header := range headers {
			cell := fmt.Sprintf("%s1", string(rune('A'+i))) // A, B, C...
			f.SetCellValue(sheetName, cell, header)
		}

		// Načti data odpovídající danému oboru
		row := 2 // Začínáme na druhém řádku
		for _, prihlaska := range prihlasky {
			if strings.ToLower(prihlaska.Obor) == oborKey {
				f.SetCellValue(sheetName, fmt.Sprintf("A%d", row), prihlaska.JmenoZaka)
				f.SetCellValue(sheetName, fmt.Sprintf("B%d", row), prihlaska.DatumNarozeni)
				f.SetCellValue(sheetName, fmt.Sprintf("C%d", row), prihlaska.MistoNarozeni)
				f.SetCellValue(sheetName, fmt.Sprintf("D%d", row), prihlaska.StatniObcanstvi)
				f.SetCellValue(sheetName, fmt.Sprintf("E%d", row), prihlaska.TrvalyPobyt)
				f.SetCellValue(sheetName, fmt.Sprintf("F%d", row), prihlaska.TelefonRodic)
				f.SetCellValue(sheetName, fmt.Sprintf("G%d", row), prihlaska.ZakonyZastupce)
				f.SetCellValue(sheetName, fmt.Sprintf("H%d", row), prihlaska.Email)
				row++
			}
		}

		// Ulož soubor na specifikované místo
		if err := f.SaveAs(filePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	// Odpověz úspěšnou zprávou
	c.JSON(http.StatusOK, gin.H{"message": "Soubory byly úspěšně vytvořeny"})
}

type TimeRange struct {
	From     string `json:"from"`
	To       string `json:"to"`
	Location string `json:"location"`
}

type InputData struct {
	H     []TimeRange `json:"H"`
	V     []TimeRange `json:"V"`
	T     []TimeRange `json:"T"`
	Start string      `json:"start"`
	End   string      `json:"end"`
}

func ProcessPrihlaskaTimes(c *gin.Context) {
	var input InputData
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("failed to parse JSON: %v", err)})
		return
	}

	startDate, err := time.Parse(time.RFC3339, input.Start)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("invalid start date format: %v", err)})
		return
	}

	endDate, err := time.Parse(time.RFC3339, input.End)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("invalid end date format: %v", err)})
		return
	}

	dayFields := []string{"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"}
	locations := []string{"Hradec Králové", "Pardubice", "Chrudim", "", "Kolín", "", "Nymburk"}

	current := startDate
	for current.Before(endDate) || current.Equal(endDate) {
		weekStart := current
		weekEnd := current.AddDate(0, 0, 6)
		if weekEnd.After(endDate) {
			weekEnd = endDate
		}

		result := models.Prihlaska_times{
			Start: weekStart,
			End:   weekEnd,
		}

		// Process H and T with time splits
		processArray := func(prefix string, data []TimeRange) error {
			if len(data) != 7 {
				return fmt.Errorf("invalid array length for %s, must be 7", prefix)
			}
			for i, tr := range data {
				fieldName := fmt.Sprintf("%s%s", prefix, dayFields[i])
				dateStr := current.AddDate(0, 0, i).Format("2.1.2006")
				if tr.From == "" && tr.To == "" {
					reflect.ValueOf(&result).Elem().FieldByName(fieldName).SetString("notimes")
				} else {
					// Split the time range into 15-minute intervals
					timeSlots := splitTimeRange(tr.From, tr.To)
					city := locations[i]
					reflect.ValueOf(&result).Elem().FieldByName(fieldName).SetString(
						fmt.Sprintf("%s,%s,%s", dateStr, city, timeSlots),
					)
				}
			}
			return nil
		}

		// Process H and T
		if err := processArray("H", input.H); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := processArray("T", input.T); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Process V (no change)
		for i, tr := range input.V {
			fieldName := fmt.Sprintf("V%s", dayFields[i])
			dateStr := current.AddDate(0, 0, i).Format("2.1.2006")
			city := locations[i]
			if tr.From == "" && tr.To == "" {
				reflect.ValueOf(&result).Elem().FieldByName(fieldName).SetString("notimes")
			} else {
				reflect.ValueOf(&result).Elem().FieldByName(fieldName).SetString(
					fmt.Sprintf("%s,%s,%s,%s", dateStr, tr.From, tr.To, city),
				)
			}
		}

		if err := database.DB.Create(&result).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("failed to save to database: %v", err)})
			return
		}

		current = weekEnd.AddDate(0, 0, 1)
	}

	c.JSON(http.StatusOK, gin.H{"message": "Data saved successfully"})
}

// Function to split time range into 15-minute intervals
func splitTimeRange(from, to string) string {
	fromTime, err := time.Parse("15:04", from)
	if err != nil {
		return "invalid time format"
	}
	toTime, err := time.Parse("15:04", to)
	if err != nil {
		return "invalid time format"
	}

	var timeSlots []string
	for fromTime.Before(toTime) || fromTime.Equal(toTime) {
		timeSlots = append(timeSlots, fmt.Sprintf("%s;1", fromTime.Format("15:04")))
		fromTime = fromTime.Add(15 * time.Minute)
	}

	return fmt.Sprintf("%s", timeSlots)
}

func StopPrijimacky(c *gin.Context) {

}

/*func Valid(c *gin.Context) {
	var prihlaskaTimes []models.Prihlaska_times
	if err := database.DB.Find(&prihlaskaTimes).Error; err != nil {
		fmt.Println("Error recieveing recors:", err)
		return
	}

	if len(prihlaskaTimes) > 0 {
		c.JSON(http.StatusOK, gin.H{"message": "Prijimacky probihaji"})
	} else {
		c.JSON(http.StatusOK, gin.H{"message": "Prijimacky neprobihaji"})
	}
}*/

func Valid(c *gin.Context) {
	// Get the last entry
	var lastRecord models.Prihlaska_times
	if err := database.DB.Order("id desc").Find(&lastRecord).Error; err != nil {
		log.Fatal("failed to find last record", err)
	}

	// Check end date
	if time.Now().After(lastRecord.End) {
		c.JSON(200, gin.H{"status": "OK", "message": "Primacky neprobihaji"})
		return
	}

	c.JSON(200, gin.H{"status": "OK", "message": "Primacky probihaji"})
}

func GetVData(c *gin.Context) {
	// Get all entries from the database
	var records []models.Prihlaska_times
	if err := database.DB.Find(&records).Error; err != nil {
		log.Fatal("failed to get records", err)
	}

	// Prepare the response
	response := make(map[string]string)
	for _, record := range records {
		// Collect all vdays
		vDays := []string{
			record.VMonday,
			record.VTuesday,
			record.VWednesday,
			record.VThursday,
			record.VFriday,
			record.VSaturday,
			record.VSunday,
		}

		// Loop through each day and add to the response map
		for _, vday := range vDays {
			if vday != "" && vday != "notimes" {
				// Split the vday to get date and info
				parts := strings.SplitN(vday, ",", 2)
				if len(parts) == 2 {
					date := parts[0]
					info := parts[1]
					response[date] = info
				}
			}
		}
	}

	// Send the JSON response
	c.JSON(200, response)
}

func GetHData(c *gin.Context) {
	// Get all entries from the database
	var records []models.Prihlaska_times
	if err := database.DB.Find(&records).Error; err != nil {
		log.Fatal("failed to get records", err)
	}

	// Prepare the response
	response := make(map[string]string)
	for _, record := range records {
		// Collect all vdays
		vDays := []string{
			record.HMonday,
			record.HTuesday,
			record.HWednesday,
			record.HThursday,
			record.HFriday,
			record.HSaturday,
			record.HSunday,
		}

		// Loop through each day and add to the response map
		for _, vday := range vDays {
			if vday != "" && vday != "notimes" {
				// Split the vday to get date and info
				parts := strings.SplitN(vday, ",", 2)
				if len(parts) == 2 {
					date := parts[0]
					info := parts[1]
					response[date] = info
				}
			}
		}
	}

	// Send the JSON response
	c.JSON(200, response)
}

func GetTData(c *gin.Context) {
	// Get all entries from the database
	var records []models.Prihlaska_times
	if err := database.DB.Find(&records).Error; err != nil {
		log.Fatal("failed to get records", err)
	}

	// Prepare the response
	response := make(map[string]string)
	for _, record := range records {
		// Collect all vdays
		vDays := []string{
			record.TMonday,
			record.TTuesday,
			record.TWednesday,
			record.TThursday,
			record.TFriday,
			record.TSaturday,
			record.TSunday,
		}

		// Loop through each day and add to the response map
		for _, vday := range vDays {
			if vday != "" && vday != "notimes" {
				// Split the vday to get date and info
				parts := strings.SplitN(vday, ",", 2)
				if len(parts) == 2 {
					date := parts[0]
					info := parts[1]
					response[date] = info
				}
			}
		}
	}

	// Send the JSON response
	c.JSON(200, response)
}

func Prihlaska(c *gin.Context) {
	var body struct {
		Jmeno         string `json:"jmeno"`
		DatumNarozeni string `json:"datumNarozeni"`
		RodicTel      string `json:"rodicTel"`
		Obor          string `json:"obor"`
		Schuzka       string `json:"schuzka"`
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "cannot bind body",
		})
		return
	}

	// vemeš logs
	var prihlaskaLogs []models.PrihlaskaLog
	database.DB.Find(&prihlaskaLogs)

	var alertBool bool

	// podmínky jestli je něco špatně
	for _, prihlaska := range prihlaskaLogs {
		if prihlaska.Jmeno == body.Jmeno && prihlaska.DatumNarozeni == body.DatumNarozeni && prihlaska.RodicTel == prihlaska.RodicTel {
			if prihlaska.Obor == body.Obor {
				alertBool = true
				break
			}
		}
	}

	// je detekováno?
	if alertBool {
		// OH NO SPAMMING SHIT DETECTED
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "gg dolítal si",
		})
	}

	// po dokončení vytvoření příhlašky uděláš log
	var newPrihlaska models.PrihlaskaLog
	newPrihlaska.Jmeno = body.Jmeno
	newPrihlaska.DatumNarozeni = body.DatumNarozeni
	newPrihlaska.Obor = body.Obor
	newPrihlaska.RodicTel = body.RodicTel

	database.DB.Create(&newPrihlaska)

	c.JSON(http.StatusOK, gin.H{
		"status":  "ok",
		"message": "yay přihláška vytvořena",
	})

	// LE DONE
}
