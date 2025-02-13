package models

import (
	"time"
)

type Prihlaska struct {
	ID              uint      `gorm:"primarykey"`
	CreatedAt       time.Time `gorm:"type:datetime"`
	Obor            string
	HlavniPredmet   string
	JmenoZaka       string
	RodneCisloZaka  string
	DatumNarozeni   string
	MistoNarozeni   string
	StatniObcanstvi string
	TrvalyPobyt     string
	TelefonRodic    string
	JeZakem         string
	ZakonyZastupce  string
	Email           string
}

type PrihlaskaLog struct {
	ID            uint      `gorm:"primarykey"`
	CreatedAt     time.Time `gorm:"type:datetime"`
	Jmeno         string
	Obor          string
	DatumNarozeni string
	RodicTel      string
}
