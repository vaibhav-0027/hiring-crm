package repository

import (
	"fmt"

	"github.com/google/uuid"
	"go.uber.org/zap"

	"github.com/vaibhav-0027/hiring-crm/model"
	"github.com/vaibhav-0027/hiring-crm/utils"
	"gorm.io/gorm"
)

type VacancyRepository interface {
	CreateVacancy(model.Vacancy) (model.Vacancy, error)
	GetAllVacancyList() ([]model.Vacancy, error)
	GetVacancyWithID(uuid.UUID) (model.Vacancy, error)
	GetVacancyListForCompany(uuid.UUID) ([]model.Vacancy, error)
	UpdateVacancy(model.Vacancy) (model.Vacancy, error)
	DeleteVacancy(model.Vacancy) (model.Vacancy, error)
}

type vacancyRepository struct {
	connection *gorm.DB
}

func NewVacancyRepository() VacancyRepository {
	return &vacancyRepository{
		connection: DB(),
	}
}

func (db *vacancyRepository) CreateVacancy(vacancy model.Vacancy) (model.Vacancy, error) {
	// check if companyID is valid
	err := db.connection.First(&model.Company{}, vacancy.CompanyID).Error
	if err != nil {
		return vacancy, fmt.Errorf("required foreign key id does not exist")
	}

	// TODO: check if fileID is valid

	return vacancy, db.connection.Create(&vacancy).Error
}

func (db *vacancyRepository) GetAllVacancyList() (vacancyList []model.Vacancy, err error) {
	return vacancyList, db.connection.Order("updated_at desc").Find(&vacancyList, "is_open=?", true).Error
}

func (db *vacancyRepository) GetVacancyWithID(id uuid.UUID) (vacancy model.Vacancy, err error) {
	return vacancy, db.connection.First(&vacancy, id).Error
}

func (db *vacancyRepository) GetVacancyListForCompany(id uuid.UUID) (vacancyList []model.Vacancy, err error) {
	return vacancyList, db.connection.Order("updated_at desc").Find(&vacancyList, "company_id=?", id).Error

}

func (db *vacancyRepository) UpdateVacancy(vacancy model.Vacancy) (model.Vacancy, error) {
	updatedVacancy := model.Vacancy{
		RoleName:       vacancy.RoleName,
		PackageMin:     vacancy.PackageMin,
		PackageMax:     vacancy.PackageMax,
		JobDescription: vacancy.JobDescription,
		CountOpen:      vacancy.CountOpen,
		CountClosed:    vacancy.CountClosed,
		IsOpen:         vacancy.IsOpen,
		Stages:         vacancy.Stages,
		CompanyID:      vacancy.CompanyID,
		FileID:         vacancy.FileID,
	}

	utils.Logger.Debug(
		"Logging vacancy incoming data",
		zap.Any("vacancy", updatedVacancy),
	)

	err := db.connection.First(&vacancy, vacancy.ID).Error
	if err != nil {
		return vacancy, err
	}

	return vacancy,
		db.connection.Model(&vacancy).Updates(updatedVacancy).Error
}

func (db *vacancyRepository) DeleteVacancy(vacancy model.Vacancy) (model.Vacancy, error) {
	err := db.connection.First(&vacancy, vacancy.ID).Error
	if err != nil {
		return vacancy, err
	}

	return vacancy, db.connection.Delete(&vacancy).Error
}
