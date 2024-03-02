package handlers

import (
	"backend/ent"
	"backend/pkg/product"
	"context"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetProducts(session *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		// param
		ctx := context.Background()

		result, err := product.GetProducts(ctx, session)

		if err != nil {
			return HandlerErr(c, err.Error())
		}

		return c.JSON(fiber.Map{"data": result})
	}

}

func GetProduct(session *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		// param
		ctx := context.Background()
		param := c.Params("id")

		// fmt.Println("param")
		// fmt.Println(param)

		Id, err := strconv.Atoi(param)

		if err != nil {
			return HandlerErr(c, err.Error())
		}

		result, err := product.GetProduct(ctx, session, Id)

		if err != nil {
			return HandlerErr(c, err.Error())
		}

		return c.JSON(fiber.Map{"data": result})
	}

}
