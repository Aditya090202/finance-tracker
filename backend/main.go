package main

import (
	"log"
	"os"

	"github.com/Aditya090202/finance-tracker/database"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

// This is a type that defines a transaction
type Transaction struct {
	gorm.Model
	ID       uint `json:"id" gorm:"primaryKey"`
	Amount   float64
	Category string
	Type     string
}

var db *gorm.DB

func setUpDatabase() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env file")
	}
	db, err = database.Connect(os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal("Failed to connect to db: ", err)
	}
	db.Create(&Transaction{ID: 3, Amount: 2354.30, Category: "Electronics", Type: "not sure"})
}

func main() {
	app := fiber.New()
	app.Use(cors.New())

	setUpDatabase()
	//This creates a GET route that will handle all requests to "/transactions"
	app.Get("/transactions", func(c *fiber.Ctx) error {
		var transactions []Transaction
		db.Find(&transactions)
		return c.JSON(transactions)
	})

	// this creates a POST route that stores a newly created transaction
	app.Post("/transactions", func(c *fiber.Ctx) error {
		var t Transaction
		if err := c.BodyParser(&t); err != nil {
			return err
		}
		db.Create(&t)
		return c.JSON(t)
	})

	log.Fatal(app.Listen(":8080"))
}
