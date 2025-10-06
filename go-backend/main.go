package main

import (
	"github.com/DanielRuvchee/go-bookvault/controller"
	"github.com/DanielRuvchee/go-bookvault/db"
	"github.com/DanielRuvchee/go-bookvault/middleware"
	"github.com/DanielRuvchee/go-bookvault/objects"
	"github.com/gin-gonic/gin"
)

func main() {
	db.Connect()
	db.DB.AutoMigrate(&objects.Book{}, &objects.User{})

	r := gin.Default()

	//Public
	r.GET("/register", controller.Register)
	r.GET("/login", controller.Login)
	r.GET("/books", controller.GetBooks)

	//Protected
	auth := r.Group("/")
	auth.Use(middleware.AuthMiddleware())
	auth.POST("/books", controller.CreateBook)
	auth.GET("/books/:id", controller.GetBook)
	auth.PUT("/books/:id", controller.UpdateBook)
	auth.DELETE("/books/:id", controller.DeleteBook)

	r.Run(":8080")
}
