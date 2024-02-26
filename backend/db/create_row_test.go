package db

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

func TestCreate(t *testing.T) {
	client := testutil.MockDB(t)
	defer client.Close()
	ctx := context.Background()

	envset.Load(".env.dev")
	mockPath := os.Getenv("MOCK_DATA")

	t.Run("Test Store Create", func(t *testing.T) {

		var storeData []ent.Store
		var filePath = filepath.Join(mockPath, "db", "store.json")
		local_file.LoadJson(filePath, &storeData)

		storeCreate := CreateStoreRow(client, ctx, &storeData[0])
		storeCreate.SaveX(ctx)

		_, err := client.Store.Query().First(ctx)

		if err != nil {
			t.Fatal("Store error")
		}

	})
	t.Run("Test Product Create", func(t *testing.T) {

		var productData []ent.Product
		var filePath = filepath.Join(mockPath, "db", "product.json")
		local_file.LoadJson(filePath, &productData)

		productCreate := CreateProductRow(client, ctx, &productData[0])
		productCreate.SaveX(ctx)

		_, err := client.Product.Query().First(ctx)

		if err != nil {
			t.Fatalf("Product error: \n %v", err)
		}

	})
	t.Run("Test Delivery Agency Create", func(t *testing.T) {

		var DeliveryAgencyData []ent.DeliveryAgency
		var filePath = filepath.Join(mockPath, "db", "delivery_agency.json")
		local_file.LoadJson(filePath, &DeliveryAgencyData)

		delveryAgencyRow := CreateDelveryAgencyRow(client, ctx, &DeliveryAgencyData[0])
		delveryAgencyRow.SaveX(ctx)

		_, err := client.DeliveryAgency.Query().First(ctx)

		if err != nil {
			t.Fatalf("Delivery Agency error : \n %v", err)
		}

	})

}
