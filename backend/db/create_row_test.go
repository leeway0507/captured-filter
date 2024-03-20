package db

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

func TestCreate(t *testing.T) {
	session := testutil.MockDB(t)
	defer session.Close()
	ctx := context.Background()

	envset.Load(".env.dev")
	mockPath := os.Getenv("MOCK_DATA")

	t.Run("Test Store Create", func(t *testing.T) {

		var filePath = filepath.Join(mockPath, "db", "store.json")
		d, err := local_file.LoadJson[[]ent.Store](filePath)
		if err != nil {
			t.Fatal("Store error")
		}
		storeData := *d
		storeCreate := CreateStoreRow(session, ctx, &storeData[0])
		err = storeCreate.Exec(ctx)
		if err != nil {
			t.Errorf("should have unique conflict err : %s", err)
		}

		_, err = session.Store.Query().First(ctx)
		if err != nil {
			t.Fatal("Store error")
		}

	})
	t.Run("Test Product Create", func(t *testing.T) {

		var filePath = filepath.Join(mockPath, "db", "product_50.json")
		productData, err := local_file.LoadJson[[]ent.Product](filePath)
		if err != nil {
			t.Fatalf("Product error: \n %v", err)
		}

		productCreate := CreateProductRow(session, ctx, "test_store", &(*productData)[0])
		err = productCreate.Exec(ctx)
		if err != nil {
			t.Errorf("should have unique conflict err : %s", err)
		}

		_, err = session.Product.Query().First(ctx)

		if err != nil {
			t.Fatalf("Product error: \n %v", err)
		}

	})

	t.Run("Test Delivery Agency Create", func(t *testing.T) {

		var filePath = filepath.Join(mockPath, "db", "delivery_agency.json")
		d, err := local_file.LoadJson[[]ent.DeliveryAgency](filePath)
		if err != nil {
			t.Fatalf("Delivery Agency error : \n %v", err)
		}
		DeliveryAgencyData := *d
		delveryAgencyRow := CreateDelveryAgencyRow(session, ctx, &DeliveryAgencyData[0])

		err = delveryAgencyRow.Exec(ctx)
		if err != nil {
			t.Errorf("should have unique conflict err : %s", err)
		}

		_, err = session.DeliveryAgency.Query().First(ctx)

		if err != nil {
			t.Fatalf("Delivery Agency error : \n %v", err)
		}

	})

}

func Test_Product_Unique_Check(t *testing.T) {
	session := testutil.MockDB(t)
	defer session.Close()
	ctx := context.Background()

	testutil.LoadStoreDataForForeignKey(t, session, ctx)

	envset.Load(".env.dev")
	mockPath := os.Getenv("MOCK_DATA")

	var filePath = filepath.Join(mockPath, "db", "product_unique_test.json")
	d, err := local_file.LoadJson[[]ent.Product](filePath)
	if err != nil {
		t.Fatalf("Product error: \n %v", err)
	}

	productCreate := CreateProductRow(session, ctx, "test_store", &(*d)[0])
	err = productCreate.Exec(ctx)
	if err != nil {
		t.Errorf("should have unique conflict err : %s", err)
	}

	t.Run("Test product create and raise unique conflict error", func(t *testing.T) {
		// presume test rows are inserted previous testing.
		prodName_prodUrl_Identical := (*d)[0]
		productCreate := CreateProductRow(session, ctx, "test_store", &prodName_prodUrl_Identical)
		err := productCreate.Exec(ctx)
		if err != nil {
			t.Errorf("should have unique conflict err : %s", err)
		}
	})
	t.Run("Test Product Create and Check Unique Options is validate", func(t *testing.T) {
		// presume test rows are inserted previous testing.
		prodUrl_Identical := (*d)[1]
		productCreate := CreateProductRow(session, ctx, "test_store", &prodUrl_Identical)
		err := productCreate.Exec(ctx)
		if err != nil {
			t.Errorf("prodUrl_Identical error %s", err)
		}

	})
	t.Run("Test Product Create and Check Unique Options is validate", func(t *testing.T) {
		// presume test rows are inserted previous testing.
		prodName_Identical := (*d)[2]
		productCreate := CreateProductRow(session, ctx, "test_store", &prodName_Identical)
		err := productCreate.Exec(ctx)
		if err != nil {
			t.Errorf("prodName_Identical %v", err)
		}

	})
}
