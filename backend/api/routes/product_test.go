package routes

import (
	"backend/api/handlers"
	"backend/lib/testutil"
	"backend/lib/testutil/apitest"
	"context"
	"database/sql"
	"net/http/httptest"
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
	t.Run("Test_SearchProducts", func(t *testing.T) {
		app.Get("/test", handlers.SearchProduct(session))

		searchQuery := "ie7002"

		req := httptest.NewRequest("GET", "/test?search="+searchQuery, nil)

		res := apitest.IsSuccess(t, app, req)

		data, ok := res["data"].(([]interface{}))
		if !ok {
			t.Fatalf("Failed to Search res: %s", res["data"])
		}

		x := data[0]
		d, ok := (x.(map[string]interface{}))
		if !ok {
			t.Fatalf("Failed to Search res: %s", data)
		}

		if d["product_id"] != searchQuery {
			t.Fatalf("Failed to Search got %s want %s", d["product_id"], searchQuery)
		}

	})
	t.Run("Test_GetProduct", func(t *testing.T) {
		app.Get("/test/:id", handlers.GetProduct(session))

		req := httptest.NewRequest("GET", "/test/1", nil)

		apitest.IsSuccess(t, app, req)
	})
}

func setMockProductData(t *testing.T, session *sql.DB) {
	ctx := context.Background()
	testutil.LoadStoreDataForForeignKey(t, session, ctx)
	testutil.LoadMockProductData(t, session, ctx)

}
