package contact

import (
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/daritelska-platforma/v2/api"
	"github.com/daritelska-platforma/v2/database"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	_ "gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Tabler interface {
	TableName() string
}

// TableName overrides
func (Contact) TableName() string {
	return "app.contacts"
}

type Contact struct {
	ID        uuid.UUID      `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	FirstName string         `json:"firstName" valid:"required,minstringlength(2)~field-too-short,maxstringlength(50)~field-too-long"`
	LastName  string         `json:"lastName" valid:"required,minstringlength(2)~field-too-short,maxstringlength(50)~field-too-long"`
	Email     string         `json:"email" valid:"required,email"`
	Company   string         `json:"company" valid:"maxstringlength(50)~field-too-long"`
	Phone     string         `json:"phone" valid:"required,phone"`
	Message   string         `json:"message" valid:"required,minstringlength(10)~field-too-short,maxstringlength(500)~field-too-long"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deletedAt"`
}

func GetContacts(db *database.Database) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		var contacts []Contact
		db.Find(&contacts)
		return ctx.JSON(contacts)
	}
}

func GetContact(db *database.Database) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		id := ctx.Params("id")
		var contact Contact
		db.Find(&contact, "id = ?", id)
		if contact.ID == uuid.Nil {
			return ctx.Status(404).JSON(&fiber.Map{
				"success": false,
				"error":   "No contact found",
			})
		}
		return ctx.JSON(contact)
	}
}

func NewContact(db *database.Database) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		contact := new(Contact)
		if err := ctx.BodyParser(contact); err != nil {
			return ctx.Status(503).JSON(&fiber.Map{
				"success": false,
				"error":   err.Error(),
			})
		}

		_, err := govalidator.ValidateStruct(contact)
		if err != nil {
			return ctx.Status(400).JSON(&fiber.Map{
				"success": false,
				"errors":  api.Compile(err.(govalidator.Errors).Errors()),
			})
		}

		db.Create(&contact)
		return ctx.JSON(contact)
	}
}

func DeleteContact(db *database.Database) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		id := ctx.Params("id")

		var contact Contact
		db.First(&contact, "id = ?", id)
		if contact.ID == uuid.Nil {
			return ctx.Status(404).JSON(&fiber.Map{
				"success": false,
				"error":   "No contact found",
			})
		}
		db.Delete(&contact)
		return ctx.Status(400).JSON(&fiber.Map{
			"success": true,
		})
	}
}
