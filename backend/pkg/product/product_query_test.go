package product

import (
	"backend/lib/db"
	"backend/lib/envset"
	"backend/lib/local_file"
	"backend/lib/testutil"
	"context"
	"os"
	"path/filepath"
	"testing"

	_ "github.com/go-sql-driver/mysql"
)

func Test_SQL_QUERY(t *testing.T) {
	client := testutil.MockDB(t)
	defer testutil.FinishAll(t, client)

	ctx := context.Background()
	testutil.LoadStoreDataForForeignKey(t, client, ctx)

	envset.Load(".env.dev")
	mockPath := os.Getenv("MOCK_DATA")

	t.Run("Test_CreateProducts", func(t *testing.T) {
		var filePath = filepath.Join(mockPath, "db", "product_50.json")
		d, err := local_file.LoadJson[[]db.Product](filePath)
		if err != nil {
			t.Fatal(err)
		}

		err = CreateProducts(ctx, client, d)
		if err != nil {
			t.Fatal(err)
		}
	})

	t.Run("Test_GetProducts", func(t *testing.T) {
		q, err := testutil.GetProductsQuery(ctx, client)
		if err != nil {
			t.Fatal(err)
		}
		if len(*q) == 0 {
			t.Fatal(err)
		}
	})

	t.Run("Test_a_GetProduct", func(t *testing.T) {
		id := 1
		q, err := GetProduct(ctx, client, id)
		if err != nil {
			t.Fatal(err)
		}
		if q.ID != 1 {
			t.Fatal(err)
		}
	})

}
