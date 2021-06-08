package database

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type PrimaryKeyUUID struct {
	ID uuid.UUID `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
}

type TimeFields struct {
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `json:"deletedAt" gorm:"index"`
}
