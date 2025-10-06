package services

import (
	"errors"

	"github.com/DanielRuvchee/go-bookvault/objects"
	"github.com/DanielRuvchee/go-bookvault/repository"
	"github.com/DanielRuvchee/go-bookvault/utils"
)

func RegisterUser(username, email, password string) error {
	hashed, err := utils.HashPassword(password)
	if err != nil {
		return err
	}

	user := objects.User{Username: username, Email: email, Password: hashed}
	return repository.CreateUser(&user)
}

func LoginUser(email, password string) (string, error) {
	user, err := repository.FindUserByEmail(email)
	if err != nil {
		return "", errors.New("invalid credientals")
	}
	if !utils.CheckPasswordHash(password, user.Password) {
		return "", errors.New("invalid credientals")
	}
	token, err := utils.GenerateJWT(user.Username, user.ID)
	if err != nil {
		return "", err
	}
	return token, nil
}
