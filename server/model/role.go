package model

type Role struct {
	Base

	Name        string `json:"name" binding:"required" gorm:"unique"`
	Description string `json:"description"`
}

func (r *Role) TableName() string {
	return "role"
}
