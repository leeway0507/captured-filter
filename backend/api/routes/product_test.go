package routes

import (
	"backend/api/handlers"
	"backend/ent"
	"backend/lib/envset"
	"backend/lib/local_file"
	"backend/lib/testutil"
	"backend/lib/testutil/apitest"
	"backend/pkg/product"
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
	setMockProductData(t, session)

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

func setMockProductData(t *testing.T, session *ent.Client) {
	ctx := context.Background()

	envset.Load(".env.dev")
	mockPath := os.Getenv("MOCK_DATA")

	testutil.LoadStoreDataForForegnKey(t, session, ctx)

	filePath := filepath.Join(mockPath, "db", "product.json")
	productData, err := local_file.LoadJson[[]ent.Product](filePath)

	if err != nil {
		t.Fatal(err)
	}

	err = product.CreateProduct(ctx, session, "test_store", &(*productData)[0])
	if err != nil {
		panic(err)
	}
}
