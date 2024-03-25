package store

import (
	"backend/lib/db"
	"backend/lib/envset"
	"backend/lib/local_file"
	"backend/lib/testutil"
	"context"
	"os"
	"path/filepath"
	"testing"
)

func Test_Store_Query(t *testing.T) {
	client := testutil.MockDB(t)
	defer testutil.FinishAll(t, client)
	ctx := context.Background()

	envset.Load(".env.dev")
	mockPath := os.Getenv("MOCK_DATA")

	t.Run("Test_CreateStore_Query", func(t *testing.T) {

		var filePath = filepath.Join(mockPath, "db", "store.json")
		d, err := local_file.LoadJson[[]db.Store](filePath)
		if err != nil {
			t.Fatal(err)
		}

		err = CreateStoresQuery(ctx, client, d)
		if err != nil {
			t.Fatal(err)
		}
	})

	t.Run("Test_GetStores_Query", func(t *testing.T) {
		res, err := GetStoresQuery(ctx, client)
		if err != nil {
			t.Error(err)
		}
		if len(*res) == 0 {
			t.Error("\n len(res) must be 1 \n ")
		}
		t.Log(res)
	})

	t.Run("Test_a_GetProduct", func(t *testing.T) {
		storeName := "test_store"
		q, err := GetStoreQuery(ctx, client, storeName)
		if err != nil {
			t.Fatal(err)
		}
		if q.StoreName != storeName {
			t.Fatal(err)
		}
	})

}
