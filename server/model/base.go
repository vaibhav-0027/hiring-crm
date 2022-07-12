package model

import (
	"time"

	"github.com/google/uuid"
	// "github.com/jinzhu/gorm"
	"gorm.io/gorm"
)

// Base contains common columns for all tables.
type Base struct {
	ID        uuid.UUID  `json:"id" gorm:"primary_key"`
	CreatedAt time.Time  `json:"createdAt"`
	UpdatedAt time.Time  `json:"updatedAt"`
	DeletedAt *time.Time `sql:"index"`
}

// BeforeCreate will set a UUID rather than numeric ID.
func (base *Base) BeforeCreate(scope *gorm.DB) error {
	uuid, err := uuid.NewUUID()
	if err != nil {
		return err
	}
	base.ID = uuid
	return nil
}
