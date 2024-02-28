package product

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

func Test_Product(t *testing.T) {
	client := testutil.MockDB(t)
	defer client.Close()
	ctx := context.Background()

	envset.Load(".env.dev")
	mockPath := os.Getenv("MOCK_DATA")

	t.Run("Test_CreateProduct", func(t *testing.T) {
		var productData []ent.Product
		var filePath = filepath.Join(mockPath, "db", "product.json")
		local_file.LoadJson(filePath, &productData)

		err := CreateProduct(ctx, client, &productData[0])
		if err != nil {
			t.Error(err)
		}
	})

	t.Run("Test_GetProducts", func(t *testing.T) {
		res, err := GetProducts(ctx, client)
		if err != nil {
			t.Error(err)
		}
		if len(res) == 0 {
			t.Error("\n len(res) must be 1 \n ")
		}
		t.Log(res)
	})
	t.Run("Test_GetProduct", func(t *testing.T) {
		res, err := GetProduct(ctx, client, 1)
		if err != nil {
			t.Error(err)
		}
		if res.ID != 1 {
			t.Error("\n res must be 1 \n ")
		}
		t.Log(res)
	})

}
