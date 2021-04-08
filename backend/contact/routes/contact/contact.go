package contact

import (
	"errors"

	"github.com/asaskevich/govalidator"
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
	database.PrimaryKeyUUID
	FirstName string `json:"firstName" valid:"required,minstringlength(2)~field-too-short,maxstringlength(50)~field-too-long"`
	LastName  string `json:"lastName" valid:"required,minstringlength(2)~field-too-short,maxstringlength(50)~field-too-long"`
	Email     string `json:"email" valid:"required,email"`
	Company   string `json:"company" valid:"maxstringlength(50)~field-too-long"`
	Phone     string `json:"phone" valid:"required,phone"`
	Message   string `json:"message" valid:"required,minstringlength(10)~field-too-short,maxstringlength(500)~field-too-long"`
	database.TimeFields
}

func GetContacts(db *database.Database) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		var contacts []Contact
		err := db.Find(&contacts).Error
		if err != nil {
			panic(err)
		}

		return ctx.JSON(contacts)
	}
}

func GetContact(db *database.Database) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		id := ctx.Params("id")
		var contact Contact

		err := db.Find(&contact, "id = ?", id).Error
		if err != nil {
			panic(err)
		}

		if contact.ID == uuid.Nil {
			return fiber.NewError(fiber.StatusNotFound, "No contact found")
		}
		return ctx.JSON(contact)
	}
}

func NewContact(db *database.Database) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		contact := new(Contact)
		if err := ctx.BodyParser(contact); err != nil {
			return fiber.NewError(fiber.StatusBadRequest, err.Error())
		}

		_, err := govalidator.ValidateStruct(contact)
		if err != nil {
			panic(err)
		}

		err = db.Create(&contact).Error
		if err != nil {
			panic(err)
		}

		return ctx.JSON(contact)
	}
}

func DeleteContact(db *database.Database) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		id := ctx.Params("id")

		var contact Contact
		err := db.First(&contact, "id = ?", id).Error
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return fiber.NewError(fiber.StatusNotFound, "No contact found")
			}
			panic(err)
		}

		if contact.ID == uuid.Nil {
			return fiber.NewError(fiber.StatusNotFound, "No contact found")
		}

		err = db.Delete(&contact).Error
		if err != nil {
			panic(err)
		}

		return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status": fiber.StatusOK,
		})
	}
}
