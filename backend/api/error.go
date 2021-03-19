package api

import (
	"strings"

	"github.com/asaskevich/govalidator"
)

type ClientErrors struct {
	Field         string `json:"field"`
	Message       string `json:"message"`
	Validator     string `json:"validator"`
	CustomMessage bool   `json:"customMessage"`
}

func Compile(errs []error) []ClientErrors {
	errors := make([]ClientErrors, len(errs))

	for i, err := range errs {
		errors[i] = ClientErrors{
			Message:       err.Error(),
			Field:         strings.Join(append(err.(govalidator.Error).Path, err.(govalidator.Error).Name), "."),
			Validator:     err.(govalidator.Error).Validator,
			CustomMessage: err.(govalidator.Error).CustomErrorMessageExists,
		}
	}

	return errors
}
