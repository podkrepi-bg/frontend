package main

import (
	"fmt"
	"log"

	"github.com/asaskevich/govalidator"
	contact "github.com/daritelska-platforma/frontend/v2/contact"
	"github.com/daritelska-platforma/frontend/v2/database"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func setupRoutes(app *fiber.App) {
	app.Get("/api/v1/contact", contact.GetContacts)
	app.Get("/api/v1/contact/:id", contact.GetContact)
	app.Post("/api/v1/contact", contact.NewContact)
	app.Delete("/api/v1/contact/:id", contact.DeleteContact)
}

func initValidation() {
	govalidator.TagMap["phone"] = govalidator.Validator(func(str string) bool {
		return govalidator.Matches(str, "^\\+?\\d+$")
	})
}

func initDatabase() {
	var err error
	dsn := "host=lb user=dp_user dbname=app port=26257 sslmode=disable"
	database.DBConn, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("Connection Opened to Database")
	database.DBConn.AutoMigrate(&contact.Contact{})
	fmt.Println("Database Migrated")
}

func main() {
	app := fiber.New()
	app.Use(cors.New())

	initValidation()
	initDatabase()

	setupRoutes(app)

	log.Fatal(app.Listen(":5000"))
}
