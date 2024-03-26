package handlers

import (
	"backend/pkg/product"
	"context"
	"database/sql"
	"encoding/json"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

var limit int = 100

func GetProducts(session *sql.DB) fiber.Handler {
	return func(c *fiber.Ctx) error {
		// param
		filterQuery := c.Query("filter")
		pageQuery := c.Query("page")
		saleQuery := c.Query("sale")

		RequestForm, err := CreateRequestForm(filterQuery, pageQuery, saleQuery)
		if err != nil {
			return HandlerErr(c, "GetProducts Error: "+err.Error())
		}

		res := product.GetProducts(session, RequestForm, limit)
		return c.JSON(fiber.Map{"data": res})
	}

}

func CreateRequestForm(filter, page, sale string) (*product.SearchRequest, error) {
	form := &product.SearchRequest{}

	if filter != "" {
		var Filter product.FilterIndex
		err := json.Unmarshal([]byte(filter), &Filter)
		if err != nil {
			return nil, err
		}
		form.Index = Filter
	}

	if page != "" {
		page, err := strconv.Atoi(page)
		if err != nil {
			return nil, err
		}
		form.Page = page
	}

	if sale != "" {
		sale, err := strconv.ParseBool(sale)
		if err != nil {
			return nil, err
		}
		form.Index.Sale = sale
	}
	return form, nil

}

func GetProduct(session *sql.DB) fiber.Handler {
	return func(c *fiber.Ctx) error {
		// param
		ctx := context.Background()
		param := c.Params("id")

		Id, err := strconv.Atoi(param)

		if err != nil {
			return HandlerErr(c, "Get Product Error : "+err.Error())
		}

		result, err := product.GetProduct(ctx, session, Id)

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
