package models

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// Full user model
type User struct {
	gorm.Model
	FullName     string   `json:"full_name"`
	ShortName    string   `json:"short_name"`
	Email        string   `json:"email"`
	PasswordHash string   `gorm:"->:false;<-:create"`
	Role         AuthRole `gorm:"role"`
}

type CreateUserInput struct {
	FullName  string   `json:"full_name"`
	ShortName string   `json:"short_name"`
	Email     string   `json:"email" valid:"email"`
	Password  string   `json:"`
	Role      AuthRole `gorm:"role"`
}

// Set db tablename
func (User) TableName() string {
	return "users"
}

func (User) HashPassword(password string) string {
	hashed, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hashed)
}

// TODO: Implement verify password function
func (User) ComparePassword() {}

// User db controller
type UserController interface {
	CreateUser(req *CreateUserInput) (*User, error)
	GetUser(id int) (*User, error)
	UpdateUser(req *CreateUserInput) (*User, error)
	DeleteUser(id int64) (int, error)
}
