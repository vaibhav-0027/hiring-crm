package model

type Company struct {
	Base
	Name          string `json:"name" binding:"required"`
	Url           string `json:"url" binding:"required" gorm:"unique"`
	Description   string `json:"description"`
	CompanySize   int32  `json:"companySize"`
	OpenVacancies int32  `json:"openVacancies"`
}

func (u *Company) TableName() string {
	return "company"
}
