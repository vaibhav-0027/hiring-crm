package model

import "github.com/google/uuid"

type Vacancy struct {
	Base
	RoleName       string    `json:"roleName" binding:"required"`
	PackageMin     float32   `json:"packageMin" binding:"required"`
	PackageMax     float32   `json:"packageMax"`
	JobDescription string    `json:"jobDescription"`
	CountOpen      int32     `json:"countOpen"`
	CountClosed    int32     `json:"countClosed"`
	IsOpen         *bool     `json:"isOpen" gorm:"default:true"`
	Stages         string    `json:"stages"`
	CompanyID      uuid.UUID `json:"companyId" binding:"required"`
	FileID         uuid.UUID `json:"fileId"`
	// Company        Company `gorm:"foreignKey:CompanyID"`
	// File           File    `gorm:"foreignKey:FileID"`
}

func (u *Vacancy) TableName() string {
	return "vacancies"
}
