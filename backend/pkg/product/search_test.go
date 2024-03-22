package product

import (
	"backend/ent/product"
	"backend/lib/testutil"
	"context"
	"testing"
)

func Test_Search(t *testing.T) {
	session := testutil.MockDB(t)
	defer session.Close()
	ctx := context.Background()

	testutil.LoadStoreDataForForeignKey(t, session, ctx)
	testutil.LoadMockProductData(t, session, ctx)

	t.Run("test_search query", func(t *testing.T) {
		v := "ie7002"
		r, err := SearchProduct(ctx, session, v)
		if err != nil {
			t.Fatal(err)
		}
		x, _ := session.Debug().Product.Query().Where(product.ProductNameContains(v)).
			All(ctx)
		t.Error(x)
		t.Error(r)
	})
}
