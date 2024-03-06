package routes

import (
	"backend/api/handlers"

	"github.com/gofiber/fiber/v2"
)

func Currency(app fiber.Router) {
	app.Get("/", handlers.GetCurrency())
}
