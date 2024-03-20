package product

import (
	"backend/ent"
	"backend/lib/envset"
	"backend/lib/local_file"
	"backend/lib/testutil"
	"context"
	"log"
	"os"
	"path/filepath"
	"strconv"
	"testing"
)

func Test_Product(t *testing.T) {
	session := testutil.MockDB(t)
	defer session.Close()
	ctx := context.Background()

	envset.Load(".env.dev")
	mockPath := os.Getenv("MOCK_DATA")

	testutil.LoadStoreDataForForeignKey(t, session, ctx)
	testutil.LoadMockProductData(t, session, ctx)

	t.Run("Test_CreateProduct", func(t *testing.T) {
		var filePath = filepath.Join(mockPath, "db", "product.json")
		d, err := local_file.LoadJson[[]ent.Product](filePath)
		if err != nil {
			t.Fatal(err)
		}

		productData := *d

		err = CreateProduct(ctx, session, "test_store", &productData[0])
		if err != nil {
			t.Fatal(err)
		}
	})

	t.Run("Test_GetProducts", func(t *testing.T) {
		limit, err := strconv.Atoi(os.Getenv("PAGE_LIMIT"))
		if err != nil {
			log.Fatalf("fail to get PAGE_LIMIT in .env : %s", err)
		}

		p := ProductPage{Page: 1, Filter: ProductFilterReq{}}
		res := GetProducts(session, &p, limit)

		got := len(res.Data)
		if got != limit {
			t.Fatalf("Test_GetProducts failed. got : %v, want :%v", got, limit)

		}
	})
	t.Run("Test_GetProduct", func(t *testing.T) {
		res, err := GetProduct(ctx, session, 1)
		if err != nil {
			t.Fatal(err)
		}
		if res.ID != 1 {
			t.Fatal("\n res must be 1 \n ")
		}
		t.Logf("%+v", res)
	})
	t.Run("Test_ProductCamel", func(t *testing.T) {
		res, err := GetProduct(ctx, session, 1)
		if err != nil {
			t.Fatal(err)
		}
		if res.ID != 1 {
			t.Fatal("\n res must be 1 \n ")
		}
	})

}
