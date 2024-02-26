package routes

import (
	"backend/api/handlers"
	"backend/ent"
	"backend/envset"
	"backend/local_file"
	"backend/pkg/deliveryagency"
	testutil "backend/test_util"
	"backend/test_util/apitest"
	"context"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"

	"github.com/gofiber/fiber/v2"
)

func Test_DeliveryAgency_Router(t *testing.T) {
	app := fiber.New()
	session := testutil.MockDB(t)
	setMockDeliveryAgencyData(session)

	t.Run("Test_GetDeliveryAgencys", func(t *testing.T) {
		app.Get("/test", handlers.GetDeliveryAgencies(session))

		req := httptest.NewRequest("GET", "/test", nil)

		apitest.IsSuccess(t, app, req)
	})
	t.Run("Test_GetDeliveryAgency", func(t *testing.T) {
		app.Get("/test/:id", handlers.GetDeliveryAgency(session))

		req := httptest.NewRequest("GET", "/test/1", nil)

		apitest.IsSuccess(t, app, req)
	})
}

func setMockDeliveryAgencyData(session *ent.Client) {
	ctx := context.Background()

	envset.Load(".env.dev")
	mockPath := os.Getenv("MOCK_DATA")

	var Data []ent.DeliveryAgency
	var filePath = filepath.Join(mockPath, "db", "delivery_agency.json")
	local_file.LoadJson(filePath, &Data)

	err := deliveryagency.CreateDeliveryAgency(ctx, session, &Data[0])
	if err != nil {
		panic(err)
	}
}
