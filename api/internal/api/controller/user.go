package controller

import (
	"api/internal/models"
	client "api/pkg/db/postgres"
	"errors"
)

type User models.User

// func (u User) CreateUser(input models.CreateUserInput) (*models.User, error) {
// 	if err := client.DB.FirstOrCreate(&input).Error; err != nil {
// 		return nil, errors.New("Something went wrong creating your user.")
// 	}

// 	return &user, nil
// }

func (u User) GetUser(id int) (*models.User, error) {
	var user models.User
	if err := client.DB.Unscoped().Find(&user, id).Error; err != nil {
		return nil, errors.New("The user you're looking for could not be found.")
	}

	return &user, nil
}
