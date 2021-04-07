package config

import (
	"fmt"
	"os"

	"github.com/spf13/viper"

	"github.com/gofiber/fiber/v2"
)

type Config struct {
	*viper.Viper

	errorHandler fiber.ErrorHandler
}

func New() *Config {
	config := &Config{
		Viper: viper.New(),
	}

	// Set default configurations
	config.setDefaults()

	// Select the .env file
	config.SetConfigName(".env")
	config.SetConfigType("dotenv")
	config.AddConfigPath(".")

	// Automatically refresh environment variables
	config.AutomaticEnv()

	// Read configuration
	if err := config.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
			fmt.Println("failed to read configuration:", err.Error())
			os.Exit(1)
		}
	}

	return config
}

func (config *Config) SetErrorHandler(errorHandler fiber.ErrorHandler) {
	config.errorHandler = errorHandler
}

func (config *Config) setDefaults() {
	// Set default App configuration
	config.SetDefault("APP_ADDR", ":5000")
	config.SetDefault("APP_ENV", "local")

	// Set default database configuration
	config.SetDefault("DB_HOST", "roach-lb")
	config.SetDefault("DB_USER", "root")
	config.SetDefault("DB_PASS", "password")
	config.SetDefault("DB_PORT", 26257)
	config.SetDefault("DB_NAME", "app")

	config.SetDefault("SSL_MODE", "disable")
	config.SetDefault("SSL_CA", "/certs/ca.crt")
	config.SetDefault("SSL_CERT", "/certs/client.dp_user.crt")
	config.SetDefault("SSL_KEY", "/certs/client.dp_user.key")
}
