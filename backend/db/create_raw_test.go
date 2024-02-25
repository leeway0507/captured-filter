package db

import (
	"backend/ent"
	"backend/local_file"
	testutil "backend/test_util"

	"context"
	"log"
	"os"
	"path/filepath"
	"testing"
)

func TestCreate(t *testing.T) {
	client := testutil.MockDB(t)
	defer client.Close()
	ctx := context.Background()

	currPath, err := os.Getwd()
	if err != nil {
		log.Fatalf("currPath err: \n %v", err)
	}

	t.Run("Test Store Create", func(t *testing.T) {

		var storeData []ent.Store
		var filePath = filepath.Join(currPath, "test_file", "store.json")
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
		var filePath = filepath.Join(currPath, "test_file", "product.json")
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
		var filePath = filepath.Join(currPath, "test_file", "delivery_agency.json")
		local_file.LoadJson(filePath, &DeliveryAgencyData)

		delveryAgencyRow := CreateDelveryAgencyRow(client, ctx, &DeliveryAgencyData[0])
		delveryAgencyRow.SaveX(ctx)

		_, err := client.DeliveryAgency.Query().First(ctx)

		if err != nil {
			t.Fatalf("Delivery Agency error : \n %v", err)
		}

	})

}
