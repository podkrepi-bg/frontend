package database

import (
	"database/sql/driver"
	"encoding/json"
  "fmt"
  "time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type JSONB map[string]interface{}

func (j JSONB) Value() (driver.Value, error) {
	valueString, err := json.Marshal(j)
	return string(valueString), err
}

func (j *JSONB) Scan(value interface{}) error {
	if err := json.Unmarshal([]byte(fmt.Sprintf("%v", value)), &j); err != nil {
		return err
	}
	return nil
}

type PrimaryKeyUUID struct {
	ID uuid.UUID `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
}

type TimeFields struct {
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deletedAt"`
}
