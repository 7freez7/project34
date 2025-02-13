package database

import (
	"fmt"
	"os"

	"github.com/mrde1v/jiri-lol/database/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Init() error {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", os.Getenv("DB_USER"), os.Getenv("DB_PASS"), os.Getenv("DB_HOST"), os.Getenv("DB_PORT"), os.Getenv("DB_NAME"))

	var err error

	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return err
	}

	return nil
}

func Sync() error {
	err := DB.AutoMigrate(&models.User{})
	if err != nil {
		return err
	}
	err = DB.AutoMigrate(&models.Novinka{})
	if err != nil {
		return err
	}
	err = DB.AutoMigrate(&models.Prihlaska{})
	if err != nil {
		return err
	}
	err = DB.AutoMigrate(&models.Prihlaska_times{})
	if err != nil {
		return err
	}
	err = DB.AutoMigrate(&models.Zamestnanci{})
	if err != nil {
		return err
	}

	err = DB.AutoMigrate(&models.PrihlaskaLog{})
	if err != nil {
		return err
	}

	return nil
}
