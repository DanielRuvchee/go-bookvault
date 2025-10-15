package repository

import (
	"github.com/DanielRuvchee/go-bookvault/db"
	"github.com/DanielRuvchee/go-bookvault/objects"
)

func GetAllBooks() ([]objects.Book, error) {
	var books []objects.Book
	result := db.DB.Find(&books)
	return books, result.Error
}

func CreateBook(book *objects.Book) error {
	return db.DB.Create(book).Error
}

func GetBooksByUserID(userID uint) ([]objects.Book, error) {
	var books []objects.Book
	result := db.DB.Where("user_id = ?", userID).Find(&books)
	return books, result.Error
}

func GetBookById(id uint) (objects.Book, error) {
	var book objects.Book
	result := db.DB.First(&book, id)
	return book, result.Error
}

func UpdateBook(book *objects.Book) error {
	return db.DB.Save(book).Error
}

func DeleteBook(id uint) error {
	return db.DB.Delete(&objects.Book{}, id).Error
}
