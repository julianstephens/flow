package postgres

import (
	"fmt"

	"api/utils"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	fmt.Println("Attempting DB connection...")

	dsn := utils.GodotEnv("POSTGRES_URI")

	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database!")
	}

	DB = database

	fmt.Println("DB connected successffully.")
}
