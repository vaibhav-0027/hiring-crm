package model

import "github.com/google/uuid"

type CompanyClient struct {
	Base
	Name         string    `json:"name" binding:"required"`
	Email        string    `json:"email" binding:"required" gorm:"unique"`
	Description  string    `json:"description"`
	MobileNumber uint64    `json:"mobileNumber"`
	CompanyID    uuid.UUID `json:"companyId" binding:"required"`
	FileID       uuid.UUID `json:"fileId"`
	// CompanyID    Company `gorm:"foreignKey:CompanyID"`
	// File         File    `gorm:"foreignKey:FileID"`
}

func (u *CompanyClient) TableName() string {
	return "company_client"
}
