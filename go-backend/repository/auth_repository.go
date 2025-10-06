package repository

import (
	"github.com/DanielRuvchee/go-bookvault/db"
	"github.com/DanielRuvchee/go-bookvault/objects"
)

func CreateUser(user *objects.User) error {
	return db.DB.Create(user).Error
}

func FindUserByEmail(email string) (objects.User, error) {
	var user objects.User
	result := db.DB.Where("email = ?", email).First(&user)
	return user, result.Error
}
