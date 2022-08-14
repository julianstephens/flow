package models

import (
	"time"

	"gorm.io/gorm"
)

type role string

const (
	USER  role = "USER"
	ADMIN role = "ADMIN"
)

//Defining the user object
type User struct {
	gorm.Model
	FullName     string    `json:"full_name"`
	ShortName    string    `json:"short_name"`
	Email        string    `json:"email"`
	PasswordHash string    `gorm:"->:false;<-:create"`
	Role         role      `gorm:"role"`
	Created_at   time.Time `json:"created_at"`
	Updated_at   time.Time `json:"updated_at"`
}

func (User) TableName() string {
	return "users"
}

type UserService interface {
	Create(user *User) error
	GetUser(id int64) (*User, error)
	GetAll() ([]*User, error)
	Update(user *User) error
	Delete(id int64) error
}
