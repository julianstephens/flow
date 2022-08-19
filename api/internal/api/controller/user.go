package controller

import (
	"api/internal/models"
	client "api/pkg/db/postgres"
	"errors"
)

type User models.User

var user models.User

func (User) CreateUser(input models.CreateUserInput) (*models.User, error) {
	// Convert request to user model
	u, _ := user.ToUser(input)

	if err := client.DB.Unscoped().Where("email = ? ", u.Email).FirstOrCreate(&u).Error; err != nil {
		return nil, errors.New("Something went wrong creating your user.")
	}

	return u, nil
}

func (User) GetUser(id int) (*models.User, error) {
	if err := client.DB.Unscoped().Find(&user, id).Error; err != nil {
		return nil, errors.New("The user you're looking for could not be found.")
	}

	return &user, nil
}

func (User) UpdateUser(input models.CreateUserInput, id int) (*models.User, error) {
	// Convert request to user model
	u, _ := user.ToUser(input)

	if err := client.DB.Unscoped().Where("id = ? ", id).Updates(&u).Error; err != nil {
		return nil, errors.New("Something went wrong updating your user.")
	}

	return u, nil
}
func (User) DeleteUser(id int) (*models.User, error) {
	if err := client.DB.Unscoped().Delete(&user, id).Error; err != nil {
		return nil, errors.New("Something went wrong deleting your user.")
	}

	return &user, nil
}
