package models

type Zamestnanci struct {
	ID        uint `gorm:"primarykey"`
	Jmeno     string
	Vyucuje   string
	Zivotopis string
	Obor      string
	Image     string
}
