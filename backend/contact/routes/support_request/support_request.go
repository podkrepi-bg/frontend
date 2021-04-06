package support_request

import (
	"errors"
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
func (SupportRequest) TableName() string {
	return "app.support_requests"
}

type SupportRequestData struct {
	Person struct {
		Email      string `json:"email" valid:"required,email"`
		Name       string `json:"name" valid:"required,minstringlength(2)~field-too-short,maxstringlength(50)~field-too-long"`
		Phone      string `json:"phone" valid:"required,phone"`
		Address    string `json:"address"`
		Terms      bool   `json:"terms"`
		Newsletter bool   `json:"newsletter"`
	} `json:"person"`
	Roles struct {
		Benefactor        bool `json:"benefactor"`
		Partner           bool `json:"partner"`
		AssociationMember bool `json:"associationMember"`
		Promoter          bool `json:"promoter"`
		Volunteer         bool `json:"volunteer"`
	} `json:"roles"`
	Benefactor struct {
		CampaignBenefactor bool `json:"campaignBenefactor"`
		PlatformBenefactor bool `json:"platformBenefactor"`
	} `json:"benefactor"`
	Partner struct {
		Npo       bool   `json:"npo"`
		Bussiness bool   `json:"bussiness"`
		Other     bool   `json:"other"`
		OtherText string `json:"otherText"`
	} `json:"partner"`
	Volunteer struct {
		Backend             bool `json:"backend"`
		Frontend            bool `json:"frontend"`
		Marketing           bool `json:"marketing"`
		Designer            bool `json:"designer"`
		ProjectManager      bool `json:"projectManager"`
		DevOps              bool `json:"devOps"`
		FinancesAndAccounts bool `json:"financesAndAccounts"`
		Lawyer              bool `json:"lawyer"`
		Qa                  bool `json:"qa"`
	} `json:"volunteer"`
	AssociationMember struct {
		IsMember bool `json:"isMember"`
	} `json:"associationMember"`
	Promoter struct {
		MediaPartner bool   `json:"mediaPartner"`
		Ambassador   bool   `json:"ambassador"`
		Other        bool   `json:"other"`
		OtherText    string `json:"otherText"`
	} `json:"promoter"`
}

type SupportRequest struct {
	ID          uuid.UUID      `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	Person      database.JSONB `json:"person" sql:"type:jsonb"`
	SupportData database.JSONB `json:"support_data" sql:"type:jsonb"`
	CreatedAt   time.Time      `json:"createdAt"`
	UpdatedAt   time.Time      `json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"deletedAt"`
}

func GetSupportRequests(db *database.Database) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		var supportRequests []SupportRequest
		err := db.Find(&supportRequests).Error
		if err != nil {
			return fiber.NewError(fiber.StatusInternalServerError, err.Error())
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
			return fiber.NewError(fiber.StatusInternalServerError, err.Error())
		}

		if supportRequest.ID == uuid.Nil {
			return fiber.NewError(fiber.StatusNotFound, "No supportRequest found")
		}
		return ctx.JSON(supportRequest)
	}
}

func NewSupportRequest(db *database.Database) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		supportRequest := new(SupportRequest)
		if err := ctx.BodyParser(supportRequest); err != nil {
			return fiber.NewError(fiber.StatusBadRequest, err.Error())
		}

		_, err := govalidator.ValidateStruct(supportRequest)
		if err != nil {
			panic(ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"status": fiber.StatusBadRequest,
				"errors": api.Compile(err.(govalidator.Errors).Errors()),
			}))
		}

		err = db.Create(&supportRequest).Error

		if err != nil {
			return fiber.NewError(fiber.StatusInternalServerError, err.Error())
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
			return fiber.NewError(fiber.StatusInternalServerError, err.Error())
		}

		if supportRequest.ID == uuid.Nil {
			return fiber.NewError(fiber.StatusNotFound, "No support request found")
		}

		err = db.Delete(&supportRequest).Error
		if err != nil {
			return fiber.NewError(fiber.StatusInternalServerError, err.Error())
		}

		return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{
			"status": fiber.StatusOK,
		})
	}
}
