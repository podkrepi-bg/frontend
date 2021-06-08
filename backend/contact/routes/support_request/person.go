package support_request

import (
	"database/sql/driver"
	"encoding/json"
)

func (j Person) Value() (driver.Value, error) {
	valueString, err := json.Marshal(j)
	return string(valueString), err
}

func (j *Person) Scan(value interface{}) error {
	if err := json.Unmarshal(value.([]byte), &j); err != nil {
		return err
	}

	return nil
}

type Person struct {
	Email          string `json:"email" valid:"required,email"`
	Name           string `json:"name" valid:"required,minstringlength(2)~field-too-short,maxstringlength(50)~field-too-long"`
	Phone          string `json:"phone" valid:"required,phone"`
	Address        string `json:"address"`
	Comment        string `json:"comment"`
	Gdpr           bool   `json:"gdpr"`
	Terms          bool   `json:"terms"`
	Newsletter     bool   `json:"newsletter"`
}
