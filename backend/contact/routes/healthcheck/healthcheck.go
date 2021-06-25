package healthcheck

import (
	"github.com/gofiber/fiber/v2"
	"github.com/podkrepi-bg/contact/database"
)

func GetHealthcheck(db *database.Database) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		if pinger, ok := db.DB.ConnPool.(interface{ Ping() error }); ok {
			err := pinger.Ping()
			if err != nil {
				return ctx.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
					"status": fiber.StatusInternalServerError,
				})
			}
		}
		return ctx.JSON(&fiber.Map{"status": fiber.StatusOK})
	}
}
