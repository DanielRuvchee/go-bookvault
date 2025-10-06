package main

import (
	"github.com/DanielRuvchee/go-bookvault/controller"
	"github.com/DanielRuvchee/go-bookvault/db"
	"github.com/DanielRuvchee/go-bookvault/objects"
	"github.com/gin-gonic/gin"
)

func main() {
	db.Connect()
	db.DB.AutoMigrate(&objects.Book{}, &objects.User{})

	r := gin.Default()

	r.GET("/books", controller.GetBooks)
	r.POST("/books", controller.CreateBook)
	r.GET("/books/:id", controller.GetBook)
	r.PUT("/books/:id", controller.UpdateBook)
	r.DELETE("/books/:id", controller.DeleteBook)

	r.Run(":8080")
}
