package routes

import (
	"backend/api/handlers"
	"backend/ent"
	"backend/lib/testutil"
	"backend/lib/testutil/apitest"
	"context"
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
	t.Run("Test_GetProduct", func(t *testing.T) {
		app.Get("/test/:id", handlers.GetProduct(session))

		req := httptest.NewRequest("GET", "/test/1", nil)

		apitest.IsSuccess(t, app, req)
	})
}

func setMockProductData(t *testing.T, session *ent.Client) {
	ctx := context.Background()
	testutil.LoadStoreDataForForeignKey(t, session, ctx)
	testutil.LoadMockProductData(t, session, ctx)

}
