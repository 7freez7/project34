package models

import "time"

type Prihlaska_times struct {
	ID         uint `gorm:"primarykey"`
	Start      time.Time
	End        time.Time
	HMonday    string
	HTuesday   string
	HWednesday string
	HThursday  string
	HFriday    string
	HSaturday  string
	HSunday    string
	VMonday    string
	VTuesday   string
	VWednesday string
	VThursday  string
	VFriday    string
	VSaturday  string
	VSunday    string
	TMonday    string
	TTuesday   string
	TWednesday string
	TThursday  string
	TFriday    string
	TSaturday  string
	TSunday    string
}
