package repository

import (
	"fmt"
	"log"
	"os"

	// "github.com/jinzhu/gorm"
	"github.com/vaibhav-0027/hiring-crm/model"
	"github.com/vaibhav-0027/hiring-crm/utils"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func DB() *gorm.DB {

	username := os.Getenv("DB_USERNAME")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	port := os.Getenv("DB_PORT")

	dsn := fmt.Sprintf("host=localhost user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai",
		username, password, dbname, port)
	// dsn := "host=localhost user=postgres password=postgres dbname=hiring-crm port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		utils.Logger.Fatal("Error connecting to the database.")
		log.Fatal("Error connecting to Database")
		return nil
	}

	db.AutoMigrate(
		&model.Candidate{},
		&model.Client{},
		&model.Company{},
		&model.Contact{},
		&model.File{},
		&model.Vacancy{})
	return db
}
