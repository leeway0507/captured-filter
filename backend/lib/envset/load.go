package envset

import (
	"fmt"
	"os"
)

func LoadEnv() {
	level := os.Getenv("ProductionLevel")
	var env string

	switch level {
	case "production":
		env = ".env.production"
	case "local":
		env = ".env.local"
	default:
		env = ".env.dev"
	}
	fmt.Printf("fiber Go Loading Eev : %v \n", level)

	Load(env)

}
