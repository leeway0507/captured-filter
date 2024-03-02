package store

import (
	"backend/ent"
	"backend/lib/envset"
	"backend/lib/local_file"
	"backend/lib/testutil"
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

		var filePath = filepath.Join(mockPath, "db", "store.json")
		d, err := local_file.LoadJson[[]ent.Store](filePath)
		if err != nil {
			t.Fatal(err)
		}
		Data := *d

		err = CreateStore(ctx, client, &Data[0])
		if err != nil {
			t.Fatal(err)
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
		res, err := GetStore(ctx, client, "test_store")
		if err != nil {
			t.Error(err)
		}
		if res.ID != "test_store" {
			t.Error("\n res must be 1 \n ")
		}
		t.Log(res)
	})

}
