package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID          uint      `gorm:"primarykey"`
	CreatedAt   time.Time `gorm:"type:datetime"`
	UpdatedAt   time.Time
	DeletedAt   gorm.DeletedAt `gorm:"index"`
	Username    string         `gorm:"unique"`
	Password    string
	Permissions string
}
