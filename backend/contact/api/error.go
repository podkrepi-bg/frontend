package api

import (
	"strings"

	"github.com/asaskevich/govalidator"
	"github.com/gofiber/fiber/v2"
)

type ValidationError struct {
	Field         string `json:"field"`
	Message       string `json:"message"`
	Validator     string `json:"validator"`
	CustomMessage bool   `json:"customMessage"`
}

type HttpError struct {
	StatusCode int    `json:"statusCode"`
	Error      string `json:"error"`
}

func Compile(errs []error) []ValidationError {
	errors := make([]ValidationError, len(errs))

	for i, err := range errs {
		errors[i] = ValidationError{
			Message:       err.Error(),
			Field:         strings.Join(append(err.(govalidator.Error).Path, err.(govalidator.Error).Name), "."),
			Validator:     err.(govalidator.Error).Validator,
			CustomMessage: err.(govalidator.Error).CustomErrorMessageExists,
		}
	}

	return errors
}

// ErrorHandler is used to catch error thrown inside the routes by ctx.Next(err)
func ErrorHandler(ctx *fiber.Ctx, err error) error {
	// Statuscode defaults to 500
	code := fiber.StatusInternalServerError

	// Check if it's an fiber.Error type
	if e, ok := err.(*fiber.Error); ok {
		code = e.Code
	}

	return ctx.Status(code).JSON(&HttpError{
		StatusCode: code,
		Error:      err.Error(),
	})
}
