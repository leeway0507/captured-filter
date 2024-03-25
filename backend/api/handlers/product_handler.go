package handlers

import (
	"backend/pkg/product"
	"context"
	"database/sql"
	"encoding/json"
	"log"
	"os"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetProducts(session *sql.DB) fiber.Handler {
	return func(c *fiber.Ctx) error {
		// param
		filterQuery := c.Query("filter")
		pageQuery := c.Query("page")
		saleQuery := c.Query("sale")

		p := &product.ProductPage{}

		if filterQuery != "" {
			var Filter product.ProductFilterBookRequest
			err := json.Unmarshal([]byte(filterQuery), &Filter)
			if err != nil {
				return HandlerErr(c, "Unmarshal Error: "+err.Error())
			}
			p.Filter = Filter
		}

		if pageQuery != "" {
			page, err := strconv.Atoi(pageQuery)
			if err != nil {
				return HandlerErr(c, "page converting error: "+err.Error())
			}
			p.Page = page
		}

		if saleQuery != "" {
			sale, err := strconv.ParseBool(saleQuery)
			if err != nil {
				return HandlerErr(c, "page converting error: "+err.Error())
			}
			p.Filter.Sale = sale
		}

		limit, err := strconv.Atoi(os.Getenv("PAGE_LIMIT"))
		if err != nil {
			log.Fatalf("fail to get PAGE_LIMIT in .env : %s", err)
		}

		res := product.GetProductFilterPage(session, p, limit)
		return c.JSON(fiber.Map{"data": res})
	}

}

func GetProduct(session *sql.DB) fiber.Handler {
	return func(c *fiber.Ctx) error {
		// param
		ctx := context.Background()
		param := c.Params("id")

		// fmt.Println("param")
		// fmt.Println(param)

		Id, err := strconv.Atoi(param)

		if err != nil {
			return HandlerErr(c, "Get Product Error : "+err.Error())
		}

		result, err := product.GetProductQuery(ctx, session, Id)

		if err != nil {
			return HandlerErr(c, err.Error())
		}

		return c.JSON(fiber.Map{"data": result})
	}
}

func GetFilterMeta(session *sql.DB) fiber.Handler {
	return func(c *fiber.Ctx) error {
		result, err := product.GetFilterMeta(session)

		if err != nil {
			return HandlerErr(c, err.Error())
		}

		return c.JSON(fiber.Map{"data": result})
	}
}
