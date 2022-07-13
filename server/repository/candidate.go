package repository

import (
	"fmt"

	"github.com/google/uuid"
	// "github.com/jinzhu/gorm"
	"github.com/vaibhav-0027/hiring-crm/model"
	"gorm.io/gorm"
)

type CandidateRepository interface {
	CreateCandidate(model.Candidate) (model.Candidate, error)
	GetCandidateWithID(uuid.UUID) (model.Candidate, error)
	GetCandidateListForVacancy(uuid.UUID) ([]model.Candidate, error)
	UpdateCandidate(model.Candidate) (model.Candidate, error)
	DeleteCandidate(model.Candidate) (model.Candidate, error)
}

type candidateRepository struct {
	connection *gorm.DB
}

func NewCandidateRepository() CandidateRepository {
	return &candidateRepository{
		connection: DB(),
	}
}

func (db *candidateRepository) CreateCandidate(candidate model.Candidate) (model.Candidate, error) {
	// check if clientID is valid
	err := db.connection.First(&model.Client{}, candidate.ClientID).Error
	if err != nil {
		return candidate, fmt.Errorf("required foreign key id does not exist")
	}

	err = db.connection.First(&model.Vacancy{}, candidate.VacancyID).Error
	if err != nil {
		return candidate, fmt.Errorf("required foreign key id does not exist")
	}

	// check if vacancyID is valid

	return candidate, db.connection.Create(&candidate).Error
}

func (db *candidateRepository) GetCandidateWithID(id uuid.UUID) (candidate model.Candidate, err error) {
	return candidate, db.connection.First(&candidate, id).Error

}

func (db *candidateRepository) GetCandidateListForVacancy(id uuid.UUID) (candidateList []model.Candidate, err error) {
	return candidateList, db.connection.Order("updated_at desc").Find(&candidateList, "vacancy_id=?", id).Error

}

func (db *candidateRepository) UpdateCandidate(candidate model.Candidate) (model.Candidate, error) {
	updatedCandidate := model.Candidate{
		Status:      candidate.Status,
		Description: candidate.Description,
	}

	err := db.connection.First(&candidate, candidate.ID).Error
	if err != nil {
		return candidate, err
	}

	return candidate, db.connection.Model(&candidate).Updates(updatedCandidate).Error
}

func (db *candidateRepository) DeleteCandidate(candidate model.Candidate) (model.Candidate, error) {
	err := db.connection.First(&candidate, candidate.ID).Error
	if err != nil {
		return candidate, err
	}

	return candidate, db.connection.Delete(&candidate).Error
}
