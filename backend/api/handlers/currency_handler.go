package handlers

import (
	"backend/pkg/currency"

	"github.com/gofiber/fiber/v2"
)

func GetCurrency() fiber.Handler {
	return func(c *fiber.Ctx) error {
		curr := currency.GetCurrency()

		return c.JSON(fiber.Map{"data": curr})
	}

}
