package routes

import (
	"backend/api/handlers"
	"backend/ent"
	"backend/envset"
	"backend/local_file"
	"backend/pkg/store"
	testutil "backend/test_util"
	"backend/test_util/apitest"
	"context"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"

	"github.com/gofiber/fiber/v2"
)

func Test_Store_Router(t *testing.T) {
	app := fiber.New()
	session := testutil.MockDB(t)
	setMockStoreData(session)

	t.Run("Test_GetStores", func(t *testing.T) {
		app.Get("/test", handlers.GetStores(session))

		req := httptest.NewRequest("GET", "/test", nil)

		apitest.IsSuccess(t, app, req)
	})
	t.Run("Test_GetStore", func(t *testing.T) {
		app.Get("/test/:id", handlers.GetStore(session))

		req := httptest.NewRequest("GET", "/test/1", nil)

		apitest.IsSuccess(t, app, req)
	})
}

func setMockStoreData(session *ent.Client) {
	ctx := context.Background()

	envset.Load(".env.dev")
	mockPath := os.Getenv("MOCK_DATA")

	var Data []ent.Store
	var filePath = filepath.Join(mockPath, "db", "store.json")
	local_file.LoadJson(filePath, &Data)

	err := store.CreateStore(ctx, session, &Data[0])
	if err != nil {
		panic(err)
	}
}
