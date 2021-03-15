package book

import (
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/daritelska-platforma/frontend/v2/database"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	_ "gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Contact struct {
	ID        uuid.UUID      `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	FirstName string         `json:"firstName" valid:"required,length(2|50)"`
	LastName  string         `json:"lastName" valid:"required,length(2|50)"`
	Email     string         `json:"email" valid:"required,email"`
	Company   string         `json:"company" valid:"length(100)"`
	Phone     string         `json:"phone" valid:"required,phone"`
	Message   string         `json:"message" valid:"required,length(2|500)"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deletedAt"`
}

func GetContacts(c *fiber.Ctx) error {
	db := database.DBConn
	var contacts []Contact
	db.Find(&contacts)
	return c.JSON(contacts)
}

func GetContact(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DBConn
	var contact Contact
	db.Find(&contact, "id = ?", id)
	if contact.ID == uuid.Nil {
		return c.Status(404).JSON(&fiber.Map{
			"success": false,
			"error":   "No contact found",
		})
	}
	return c.JSON(contact)
}

func NewContact(c *fiber.Ctx) error {
	db := database.DBConn
	contact := new(Contact)
	if err := c.BodyParser(contact); err != nil {
		return c.Status(503).SendString(err.Error())
	}
	_, err := govalidator.ValidateStruct(contact)
	if err != nil {
		errs := err.(govalidator.Errors).Errors()
		return c.Status(400).JSON(&fiber.Map{
			"success": false,
			"errors":  errs,
		})
	}

	db.Create(&contact)
	return c.JSON(contact)
}

func DeleteContact(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DBConn

	var contact Contact
	db.First(&contact, "id = ?", id)
	if contact.ID == uuid.Nil {
		return c.Status(404).JSON(&fiber.Map{
			"success": false,
			"error":   "No contact found",
		})
	}
	db.Delete(&contact)
	return c.Status(400).JSON(&fiber.Map{
		"success": true,
	})
}
