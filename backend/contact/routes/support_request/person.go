package support_request

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
)

func (j Person) Value() (driver.Value, error) {
	valueString, err := json.Marshal(j)
	return string(valueString), err
}

func (j *Person) Scan(value interface{}) error {
	return json.Unmarshal([]byte(fmt.Sprintf("%v", value)), &j)
}

type Person struct {
	Email      string `json:"email" valid:"required,email"`
	Comment    string `json:"comment"`
	Name       string `json:"name" valid:"required,minstringlength(2)~field-too-short,maxstringlength(50)~field-too-long"`
	Phone      string `json:"phone" valid:"required,phone"`
	Address    string `json:"address"`
	Gdpr       bool   `json:"gdpr"`
	Terms      bool   `json:"terms"`
	Newsletter bool   `json:"newsletter"`
}
