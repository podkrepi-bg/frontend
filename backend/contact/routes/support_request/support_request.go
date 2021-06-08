package support_request

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
func (SupportRequest) TableName() string {
	return "app.support_requests"
}

type SupportRequest struct {
	database.PrimaryKeyUUID
	Person      Person  `json:"person" gorm:"type:jsonb;"`
	SupportData SupportData `json:"support_data" gorm:"type:jsonb;"`
	database.TimeFields
}

func GetSupportRequests(db *database.Database) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		var supportRequests []SupportRequest

		err := db.Find(&supportRequests).Error
		if err != nil {
			panic(err)
		}

		return ctx.JSON(supportRequests)
	}
}

func GetSupportRequest(db *database.Database) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		id := ctx.Params("id")
		var supportRequest SupportRequest

		err := db.Find(&supportRequest, "id = ?", id).Error
		if err != nil {
			panic(err)
		}

		if supportRequest.ID == uuid.Nil {
			return fiber.NewError(fiber.StatusNotFound, "No support request found")
		}
		return ctx.JSON(supportRequest)
	}
}

func NewSupportRequest(db *database.Database) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		supportRequest := new(SupportRequest)
		if err := ctx.BodyParser(supportRequest); err != nil {
			panic(fiber.NewError(fiber.StatusBadRequest, err.Error()))
		}

		_, err := govalidator.ValidateStruct(supportRequest)
		if err != nil {
			panic(err)
		}

		err = db.Debug().Create(&supportRequest).Error
		if err != nil {
			panic(err)
		}

		return ctx.JSON(supportRequest)
	}
}

func DeleteSupportRequest(db *database.Database) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		id := ctx.Params("id")

		var supportRequest SupportRequest
		err := db.First(&supportRequest, "id = ?", id).Error
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return fiber.NewError(fiber.StatusNotFound, "No support request found")
			}
			panic(err)
		}

		if supportRequest.ID == uuid.Nil {
			return fiber.NewError(fiber.StatusNotFound, "No support request found")
		}

		err = db.Delete(&supportRequest).Error
		if err != nil {
			panic(err)
		}

		return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status": fiber.StatusOK,
		})
	}
}
