package main

import (
	"log"

	"github.com/joho/godotenv"
	"github.com/vaibhav-0027/hiring-crm/route"
	"github.com/vaibhav-0027/hiring-crm/utils"
	"go.uber.org/zap"
)

func loadenv() {
	err := godotenv.Load()
	if err != nil {
		utils.Logger.Fatal("Error loading .env file")
	}
}

func main() {
	utils.InitializeLogger()
	utils.Logger.Info("Server is starting!", zap.Int("port", 8080))

	loadenv()

	// TODO: fetch port number using environment variables
	log.Fatal(route.RunAPI("127.0.0.1:8080"))
}
