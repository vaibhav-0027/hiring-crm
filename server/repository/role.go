package repository

import (
	"github.com/google/uuid"
	"github.com/vaibhav-0027/hiring-crm/model"
	"gorm.io/gorm"
)

type RoleRepository interface {
	CreateRoleWithDetails(model.Role) (model.Role, error)
	GetAllRolesList() ([]model.Role, error)
	GetRoleById(uuid.UUID) (model.Role, error)
	UpdateRole(model.Role) (model.Role, error)
	DeleteRole(model.Role) (model.Role, error)
}

type roleRepository struct {
	connection *gorm.DB
}

func NewRoleRepository() RoleRepository {
	return &roleRepository{
		connection: DB(),
	}
}

func (db *roleRepository) CreateRoleWithDetails(role model.Role) (model.Role, error) {
	return role, db.connection.Create(&role).Error
}

func (db *roleRepository) GetAllRolesList() (roleList []model.Role, err error) {
	return roleList, db.connection.Order("updated_at desc").Find(&roleList).Error
}

func (db *roleRepository) GetRoleById(id uuid.UUID) (role model.Role, err error) {
	return role, db.connection.First(&role, id).Error
}

func (db *roleRepository) UpdateRole(role model.Role) (model.Role, error) {
	updatedRole := model.Role{
		Name:        role.Name,
		Description: role.Description,
	}

	err := db.connection.First(&role, role.ID).Error
	if err != nil {
		return role, err
	}

	return role, db.connection.Model(&role).Updates(updatedRole).Error
}

func (db *roleRepository) DeleteRole(role model.Role) (model.Role, error) {
	err := db.connection.First(&role, role.ID).Error
	if err != nil {
		return role, err
	}

	return role, db.connection.Delete(&role).Error
}
