package routes

import (
	"backend/api/handlers"
	"backend/ent"
	"backend/lib/envset"
	"backend/lib/local_file"
	"backend/lib/testutil"
	"backend/lib/testutil/apitest"
	"backend/pkg/deliveryagency"
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

	var filePath = filepath.Join(mockPath, "db", "delivery_agency.json")
	d, err := local_file.LoadJson[[]ent.DeliveryAgency](filePath)
	if err != nil {
		panic(err)
	}
	Data := *d

	err = deliveryagency.CreateDeliveryAgency(ctx, session, &Data[0])
	if err != nil {
		panic(err)
	}
}
