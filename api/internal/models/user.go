package models

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var user User

// Full user model
type User struct {
	gorm.Model
	FullName     string   `json:"full_name"`
	ShortName    string   `json:"short_name"`
	Email        string   `json:"email"`
	PasswordHash string   `gorm:"->:false;<-:create"`
	Role         AuthRole `gorm:"role" json:"role"`
}

// User input model
type CreateUserInput struct {
	FullName  string `json:"full_name" valid:"required~Full name is a required field."`
	ShortName string `json:"short_name" valid:"required~Short name is a required field."`
	Email     string `json:"email" valid:"email" valid:"required~Email is a required field."`
	Password  string `json:"password" valid:"required~Password is a required field."`
}

// Set db tablename
func (u *User) TableName() string {
	return "users"
}

// Prepare plain text pwd for storage
func (u *User) HashPassword(password string) string {
	hashed, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hashed)
}

// TODO: Implement verify password function
func (u *User) ComparePassword() {}

// Converts user request to user
func (u *User) ToUser(input CreateUserInput) (*User, error) {
	user := User{FullName: input.FullName, ShortName: input.ShortName, Email: input.Email, PasswordHash: user.HashPassword(input.Password), Role: USER}

	return &user, nil
}

// User db controller
type UserController interface {
	CreateUser(input CreateUserInput) (*User, error)
	GetUser(id int) (*User, error)
	UpdateUser(input CreateUserInput) (*User, error)
	DeleteUser(id int) (int, error)
}
