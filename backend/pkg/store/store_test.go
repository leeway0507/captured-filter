package store

import (
	"backend/ent"
	"backend/envset"
	"backend/local_file"
	testutil "backend/test_util"
	"context"
	"os"
	"path/filepath"
	"testing"
)

func Test_Store(t *testing.T) {
	client := testutil.MockDB(t)
	defer client.Close()
	ctx := context.Background()

	envset.Load(".env.dev")
	mockPath := os.Getenv("MOCK_DATA")

	t.Run("Test_CreateStore", func(t *testing.T) {
		var Data []ent.Store
		var filePath = filepath.Join(mockPath, "db", "store.json")
		local_file.LoadJson(filePath, &Data)

		err := CreateStore(ctx, client, &Data[0])
		if err != nil {
			t.Error(err)
		}
	})

	t.Run("Test_GetStores", func(t *testing.T) {
		res, err := GetStores(ctx, client)
		if err != nil {
			t.Error(err)
		}
		if len(res) == 0 {
			t.Error("\n len(res) must be 1 \n ")
		}
		t.Log(res)
	})
	t.Run("Test_GetStore", func(t *testing.T) {
		res, err := GetStore(ctx, client, 1)
		if err != nil {
			t.Error(err)
		}
		if res.ID != 1 {
			t.Error("\n res must be 1 \n ")
		}
		t.Log(res)
	})

}
