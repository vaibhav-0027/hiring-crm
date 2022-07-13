package repository

import (
	"fmt"

	"github.com/google/uuid"
	// "github.com/jinzhu/gorm"
	"github.com/vaibhav-0027/hiring-crm/model"
	"gorm.io/gorm"
)

type ContactRepository interface {
	CreateContact(model.Contact) (model.Contact, error)
	GetAllContactList() ([]model.Contact, error)
	GetContactWithID(uuid.UUID) (model.Contact, error)
	GetContactListForCompany(uuid.UUID) ([]model.Contact, error)
	UpdateContact(model.Contact) (model.Contact, error)
	DeleteContact(model.Contact) (model.Contact, error)
}

type contactRepository struct {
	connection *gorm.DB
}

func NewContactRepository() ContactRepository {
	return &contactRepository{
		connection: DB(),
	}
}

func (db *contactRepository) CreateContact(contact model.Contact) (model.Contact, error) {
	// check if companyID is valid
	err := db.connection.First(&model.Company{}, contact.CompanyID).Error
	if err != nil {
		return contact, fmt.Errorf("required foreign key id does not exist")
	}

	// TODO: check if fileID is valid

	return contact, db.connection.Create(&contact).Error
}

func (db *contactRepository) GetAllContactList() (contactList []model.Contact, err error) {
	return contactList, db.connection.Order("updated_at desc").Find(&contactList).Error
}

func (db *contactRepository) GetContactWithID(id uuid.UUID) (contact model.Contact, err error) {
	return contact, db.connection.First(&contact, id).Error

}

func (db *contactRepository) GetContactListForCompany(id uuid.UUID) (contactList []model.Contact, err error) {
	return contactList, db.connection.Find(&contactList, "company_id=?", id).Error

}

func (db *contactRepository) UpdateContact(contact model.Contact) (model.Contact, error) {
	updatedContact := model.Contact{
		Name:         contact.Name,
		Email:        contact.Email,
		Description:  contact.Description,
		MobileNumber: contact.MobileNumber,
		CompanyID:    contact.CompanyID,
	}

	err := db.connection.First(&contact, contact.ID).Error
	if err != nil {
		return contact, err
	}

	return contact, db.connection.Model(&contact).Updates(updatedContact).Error

}

func (db *contactRepository) DeleteContact(contact model.Contact) (model.Contact, error) {
	err := db.connection.First(&contact, contact.ID).Error
	if err != nil {
		return contact, err
	}

	return contact, db.connection.Delete(&contact).Error
}
