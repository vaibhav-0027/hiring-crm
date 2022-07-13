package repository

import (
	"github.com/google/uuid"
	// "github.com/jinzhu/gorm"
	"github.com/vaibhav-0027/hiring-crm/model"
	"gorm.io/gorm"
)

type ClientRepository interface {
	CreateClient(model.Client) (model.Client, error)
	GetClientWithID(uuid.UUID) (model.Client, error)
	GetAllClientForRole(uuid.UUID) ([]model.Client, error)
	GetAllClientList() ([]model.Client, error)
	UpdateClient(model.Client) (model.Client, error)
	DeleteClient(model.Client) (model.Client, error)
}

type clientRepository struct {
	connection *gorm.DB
}

func NewClientRepository() ClientRepository {
	return &clientRepository{
		connection: DB(),
	}
}

func (db *clientRepository) CreateClient(client model.Client) (model.Client, error) {
	// TODO: check if fileID is valid

	return client, db.connection.Create(&client).Error
}

func (db *clientRepository) GetClientWithID(id uuid.UUID) (client model.Client, err error) {
	return client, db.connection.First(&client, id).Error

}

func (db *clientRepository) GetAllClientForRole(id uuid.UUID) (clientList []model.Client, err error) {
	return clientList, db.connection.Order("updated_at desc").Find(&clientList, "role_id=?", id).Error
}

func (db *clientRepository) GetAllClientList() (clientList []model.Client, err error) {
	return clientList, db.connection.Order("updated_at desc").Find(&clientList).Error
}

func (db *clientRepository) UpdateClient(client model.Client) (model.Client, error) {
	updatedClient := model.Client{
		Name:            client.Name,
		Email:           client.Email,
		MobileNumber:    client.MobileNumber,
		CurrentPackage:  client.CurrentPackage,
		ExpectedPackage: client.ExpectedPackage,
		Description:     client.Description,
		WebsiteURL:      client.WebsiteURL,
		NoticePeriod:    client.NoticePeriod,
		RoleID:          client.RoleID,
		FileID:          client.FileID,
	}

	err := db.connection.First(&client, client.ID).Error
	if err != nil {
		return client, err
	}

	return client, db.connection.Model(&client).Updates(updatedClient).Error
}

func (db *clientRepository) DeleteClient(client model.Client) (model.Client, error) {
	err := db.connection.First(&client, client.ID).Error
	if err != nil {
		return client, err
	}

	return client, db.connection.Delete(&client).Error
}
