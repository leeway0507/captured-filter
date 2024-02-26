package routes

import (
	"backend/api/handlers"
	"backend/ent"
	"backend/envset"
	"backend/local_file"
	"backend/pkg/product"
	testutil "backend/test_util"
	"backend/test_util/apitest"
	"context"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"

	"github.com/gofiber/fiber/v2"
)

func Test_Product_Router(t *testing.T) {
	app := fiber.New()
	session := testutil.MockDB(t)
	setMockProductData(session)

	t.Run("Test_GetProducts", func(t *testing.T) {
		app.Get("/test", handlers.GetProducts(session))

		req := httptest.NewRequest("GET", "/test", nil)

		apitest.IsSuccess(t, app, req)
	})
	t.Run("Test_GetProduct", func(t *testing.T) {
		app.Get("/test/:id", handlers.GetProduct(session))

		req := httptest.NewRequest("GET", "/test/1", nil)

		apitest.IsSuccess(t, app, req)
	})
}

func setMockProductData(session *ent.Client) {
	ctx := context.Background()

	envset.Load(".env.dev")
	mockPath := os.Getenv("MOCK_DATA")

	var productData []ent.Product
	var filePath = filepath.Join(mockPath, "db", "product.json")
	local_file.LoadJson(filePath, &productData)

	err := product.CreateProduct(ctx, session, &productData[0])
	if err != nil {
		panic(err)
	}
}
