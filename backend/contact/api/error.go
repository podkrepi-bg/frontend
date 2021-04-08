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
	StatusCode       int               `json:"statusCode"`
	Error            string            `json:"error"`
	ValidationErrors []ValidationError `json:"validation,omitempty"`
}

func Compile(errs govalidator.Errors) []ValidationError {
	errors := make([]ValidationError, len(errs))

	for i, err := range errs {
		switch err2 := err.(type) {
		case govalidator.Errors:
			return Compile(err2)
		case govalidator.Error:
			errors[i] = ValidationError{
				Message:       err.Error(),
				Field:         strings.Join(append(err2.Path, err2.Name), "."),
				Validator:     err2.Validator,
				CustomMessage: err2.CustomErrorMessageExists,
			}
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

	switch err := err.(type) {
	case govalidator.Errors:
		return ctx.Status(fiber.StatusBadRequest).JSON(&HttpError{
			StatusCode:       fiber.StatusBadRequest,
			Error:            err.Error(),
			ValidationErrors: Compile(err.Errors()),
		})
	default:
		return ctx.Status(code).JSON(&HttpError{
			StatusCode: code,
			Error:      err.Error(),
		})
	}
}
