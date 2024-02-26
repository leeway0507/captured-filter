package handlers

import (
	"backend/ent"
	"backend/pkg/deliveryagency"
	"context"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetDeliveryAgencies(session *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		// param
		ctx := context.Background()

		result, err := deliveryagency.GetDeliveryAgencies(ctx, session)

		if err != nil {
			return HandlerErr(c, err.Error())
		}

		return c.JSON(fiber.Map{"data": result})
	}

}

func GetDeliveryAgency(session *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		// param
		ctx := context.Background()
		param := c.Params("id")

		Id, err := strconv.Atoi(param)

		if err != nil {
			return HandlerErr(c, err.Error())
		}

		result, err := deliveryagency.GetDeliveryAgency(ctx, session, Id)

		if err != nil {
			return HandlerErr(c, err.Error())
		}

		return c.JSON(fiber.Map{"data": result})
	}

}
