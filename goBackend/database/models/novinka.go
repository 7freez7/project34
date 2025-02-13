package models

import (
	"time"

	"gorm.io/gorm"
)

type Novinka struct {
	ID               uint      `gorm:"primarykey"`
	CreatedAt        time.Time `gorm:"type:datetime"`
	UpdatedAt        time.Time
	DeletedAt        gorm.DeletedAt `gorm:"index"`
	Title            string
	Content          string
	Author           string
	AuthorLastUpdate string
	Image            string
}
