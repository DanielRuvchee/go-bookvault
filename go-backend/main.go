package main

import (
	"github.com/DanielRuvchee/go-bookvault/controller"
	"github.com/DanielRuvchee/go-bookvault/db"
	"github.com/DanielRuvchee/go-bookvault/middleware"
	"github.com/DanielRuvchee/go-bookvault/objects"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db.Connect()
	db.DB.AutoMigrate(&objects.Book{}, &objects.User{})

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://127.0.0.1:3000", "https://ruvche-bookvault.vercel.app"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	//Public
	r.POST("/register", controller.Register)
	r.POST("/login", controller.Login)
	r.GET("/books", controller.GetBooks)

	//Protected
	auth := r.Group("/")
	auth.Use(middleware.AuthMiddleware())
	auth.GET("/books/mine", controller.GetUserBooks)
	auth.POST("/books", controller.CreateBook)
	auth.GET("/books/:id", controller.GetBook)
	auth.PUT("/books/:id", controller.UpdateBook)
	auth.DELETE("/books/:id", controller.DeleteBook)

	r.Run(":8080")
}
