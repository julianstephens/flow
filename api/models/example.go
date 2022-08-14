package models

import (
	"gorm.io/gorm"
)

// Checkout gorm docs for info on declaring models
// https://gorm.io/docs/models.html
type Foo struct {
	gorm.Model
	Name string
}
