package database

import (
	"strconv"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DatabaseConfig struct {
	Host     string
	Username string
	Password string
	Port     int
	Database string
	SSL      string
	RootCert string
	Cert     string
	Key      string
}

type Database struct {
	*gorm.DB
}

func New(config *DatabaseConfig) (*Database, error) {
	var db *gorm.DB
	var err error
	dsn := "host=" + config.Host +
		" user=" + config.Username +
		" password=" + config.Password +
		" dbname=" + config.Database +
		" port=" + strconv.Itoa(config.Port) +
		" TimeZone=UTC connect_timeout=0" +
		" sslmode=" + config.SSL +
		" sslrootcert=" + config.RootCert +
		" sslcert=" + config.Cert +
		" sslkey=" + config.Key
	println(dsn)
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	return &Database{db}, err
}

type BaseHandler struct {
	db *gorm.DB
}

func NewBaseHandler(db *gorm.DB) *BaseHandler {
	return &BaseHandler{db: db}
}
