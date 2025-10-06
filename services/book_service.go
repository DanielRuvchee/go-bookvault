package services

import (
	"github.com/DanielRuvchee/go-bookvault/objects"
	"github.com/DanielRuvchee/go-bookvault/repository"
)

func GetAllBooks() ([]objects.Book, error) {
	return repository.GetAllBooks()
}

func CreateBook(book objects.Book) error {
	return repository.CreateBook(&book)
}

func GetBookByID(id uint) (objects.Book, error) {
	return repository.GetBookById(id)
}

func UpdateBook(book objects.Book) error {
	return repository.UpdateBook(&book)
}

func DeleteBook(id uint) error {
	return repository.DeleteBook(id)
}
