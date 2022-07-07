package repository

import (
	"fmt"

	"github.com/google/uuid"
	// "github.com/jinzhu/gorm"
	"github.com/vaibhav-0027/hiring-crm/model"
	"gorm.io/gorm"
)

type CompanyClientRepository interface {
	CreateCompanyClient(model.CompanyClient) (model.CompanyClient, error)
	GetCompanyClientWithID(uuid.UUID) (model.CompanyClient, error)
	GetCompanyClientListForCompany(uuid.UUID) ([]model.CompanyClient, error)
	UpdateCompanyClient(model.CompanyClient) (model.CompanyClient, error)
	DeleteCompanyClient(model.CompanyClient) (model.CompanyClient, error)
}

type companyClientRepository struct {
	connection *gorm.DB
}

func NewCompanyClientRepository() CompanyClientRepository {
	return &companyClientRepository{
		connection: DB(),
	}
}

func (db *companyClientRepository) CreateCompanyClient(companyClient model.CompanyClient) (model.CompanyClient, error) {
	// check if companyID is valid
	err := db.connection.First(&model.Company{}, companyClient.CompanyID).Error
	if err != nil {
		return companyClient, fmt.Errorf("required foreign key id does not exist")
	}

	// TODO: check if fileID is valid

	return companyClient, db.connection.Create(&companyClient).Error
}
func (db *companyClientRepository) GetCompanyClientWithID(id uuid.UUID) (companyClient model.CompanyClient, err error) {
	return companyClient, db.connection.First(&companyClient, id).Error

}
func (db *companyClientRepository) GetCompanyClientListForCompany(id uuid.UUID) (companyClientList []model.CompanyClient, err error) {
	return companyClientList, db.connection.Find(&companyClientList, "company_id=?", id).Error

}
func (db *companyClientRepository) UpdateCompanyClient(companyClient model.CompanyClient) (model.CompanyClient, error) {
	updatedCompanyClient := model.CompanyClient{
		Name:         companyClient.Name,
		Email:        companyClient.Email,
		Description:  companyClient.Description,
		MobileNumber: companyClient.MobileNumber,
	}

	err := db.connection.First(&companyClient, companyClient.ID).Error
	if err != nil {
		return companyClient, err
	}

	return companyClient, db.connection.Model(&companyClient).Updates(updatedCompanyClient).Error

}
func (db *companyClientRepository) DeleteCompanyClient(companyClient model.CompanyClient) (model.CompanyClient, error) {
	err := db.connection.First(&companyClient, companyClient.ID).Error
	if err != nil {
		return companyClient, err
	}

	return companyClient, db.connection.Delete(&companyClient).Error
}
