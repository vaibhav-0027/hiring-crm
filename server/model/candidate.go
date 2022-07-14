package model

import "github.com/google/uuid"

type Candidate struct {
	Base
	Status      *int32    `json:"status" binding:"required"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	VacancyID   uuid.UUID `json:"vacancyId" binding:"required"`
	ClientID    uuid.UUID `json:"clientId" binding:"required"`
	// VacancyID   Vacancy `gorm:"foreignKey:VacancyID"`
	// ClientID    Client  `gorm:"foreignKey:ClientID"`
}

func (u *Candidate) TableName() string {
	return "candidate"
}
