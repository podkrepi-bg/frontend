package main

import (
	"fmt"
	"log"

	"github.com/podkrepi-bg/v2/api"
	"github.com/podkrepi-bg/v2/api/config"
	"github.com/podkrepi-bg/v2/database"
	"github.com/podkrepi-bg/v2/routes/contact"
	"github.com/podkrepi-bg/v2/routes/healthcheck"
	"github.com/podkrepi-bg/v2/routes/support_request"

	"github.com/asaskevich/govalidator"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

type App struct {
	*fiber.App
	env *config.Config
	DB  *database.Database
}

func (app *App) setupRoutes() {
	api := app.Group("/api/v1")

	api.Get("/healthcheck", healthcheck.GetHealthcheck(app.DB))

	contactGroup := api.Group("/contact")
	contactGroup.Get("", contact.GetContacts(app.DB))
	contactGroup.Get("/:id", contact.GetContact(app.DB))
	contactGroup.Post("", contact.NewContact(app.DB))
	contactGroup.Delete("/:id", contact.DeleteContact(app.DB))

	support := api.Group("/support-request")
	support.Get("", support_request.GetSupportRequests(app.DB))
	support.Get("/:id", support_request.GetSupportRequest(app.DB))
	support.Post("", support_request.NewSupportRequest(app.DB))
	support.Delete("/:id", support_request.DeleteSupportRequest(app.DB))

}

func (app *App) initValidation() {
	govalidator.TagMap["phone"] = govalidator.Validator(func(str string) bool {
		return govalidator.Matches(str, "^\\+?\\d+$")
	})
}

func (app *App) initDatabase() *database.Database {
	db, err := database.New(&database.DatabaseConfig{
		Host:     app.env.GetString("DB_HOST"),
		Username: app.env.GetString("DB_USER"),
		Password: app.env.GetString("DB_PASS"),
		Database: app.env.GetString("DB_NAME"),
		Port:     app.env.GetInt("DB_PORT"),
		SSL:      app.env.GetString("SSL_MODE"),
		RootCert: app.env.GetString("SSL_CA"),
		Cert:     app.env.GetString("SSL_CERT"),
		Key:      app.env.GetString("SSL_KEY"),
	})

	if err != nil {
		panic("Failed to connect database")
	}

	fmt.Println("Connection Opened to Database host:", app.env.GetString("DB_HOST"), ", port:", app.env.GetInt("DB_PORT"))

	// Add schema prefix to table
	// db.Table("app.contacts").AutoMigrate(&contact.Contact{})
	// fmt.Println("Database Migrated")
	return db
}

func main() {
	config := config.New()

	app := App{
		App: fiber.New(fiber.Config{
			ErrorHandler: api.ErrorHandler,
		}),
		env: config,
	}

	app.Use(cors.New())
	app.Use(recover.New())
	app.initValidation()
	app.DB = app.initDatabase()
	app.setupRoutes()

	log.Fatal(app.Listen(config.GetString("APP_ADDR")))
}
