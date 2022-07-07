package repository

import (
	"github.com/google/uuid"

	// "github.com/jinzhu/gorm"
	"github.com/vaibhav-0027/hiring-crm/model"
	"gorm.io/gorm"
)

type CompanyRepository interface {
	// CreateCompanyWithLinkedin(uuid.UUID)(model.Company, error)
	CreateCompanyWithDetails(model.Company) (model.Company, error)
	GetCompanyWithID(uuid.UUID) (model.Company, error)
	GetAllCompanyList() ([]model.Company, error)
	UpdateCompany(model.Company) (model.Company, error)
	DeleteCompany(model.Company) (model.Company, error)
}

type companyRepository struct {
	connection *gorm.DB
}

func NewCompanyRepository() CompanyRepository {
	return &companyRepository{
		connection: DB(),
	}
}

func (db *companyRepository) CreateCompanyWithDetails(company model.Company) (model.Company, error) {
	return company, db.connection.Create(&company).Error
}

func (db *companyRepository) GetCompanyWithID(id uuid.UUID) (company model.Company, err error) {
	return company, db.connection.First(&company, id).Error
}

func (db *companyRepository) GetAllCompanyList() (companyList []model.Company, err error) {
	return companyList, db.connection.Find(&companyList).Error
}

func (db *companyRepository) UpdateCompany(company model.Company) (model.Company, error) {
	updatedCompany := model.Company{
		Name:        company.Name,
		Url:         company.Url,
		Description: company.Description,
		CompanySize: company.CompanySize,
	}

	if err := db.connection.First(&company, company.ID).Error; err != nil {
		return company, err
	}

	return company, db.connection.Model(&company).Updates(updatedCompany).Error
}

func (db *companyRepository) DeleteCompany(company model.Company) (model.Company, error) {
	if err := db.connection.First(&company, company.ID).Error; err != nil {
		return company, err
	}

	return company, db.connection.Delete(&company).Error
}
