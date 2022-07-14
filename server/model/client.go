package model

import "github.com/google/uuid"

type Client struct {
	Base
	Name            string    `json:"name" binding:"required"`
	Email           string    `json:"email" binding:"required" gorm:"unique"`
	MobileNumber    uint64    `json:"mobileNumber" binding:"required"`
	CurrentPackage  float32   `json:"currentPackage"`
	ExpectedPackage float32   `json:"expectedPackage"`
	Description     string    `json:"description"`
	LinkedinURL     string    `json:"linkedinUrl"`
	WebsiteURL      string    `json:"websiteUrl"`
	NoticePeriod    string    `json:"noticePeriod"`
	Location        string    `json:"location"`
	Experience      float32   `json:"experience"`
	RoleID          uuid.UUID `json:"roleId"`
	FileID          uuid.UUID `json:"fileId"`
	// FileID            File    `gorm:"foreignKey:FileID"`
}

func (u *Client) TableName() string {
	return "client"
}
