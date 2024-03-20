package testutil

import (
	"context"
	"testing"
)

func TestFilter(t *testing.T) {
	session := MockDB(t)
	defer session.Close()

	ctx := context.Background()
	LoadStoreDataForForeignKey(t, session, ctx)

	t.Run("test data foreign key", func(t *testing.T) {
		p, err := session.Store.Query().All(ctx)
		if err != nil {
			t.Fatal(err)
		}
		t.Log(p)
	})
	t.Run("test load mock product data", func(t *testing.T) {

		LoadMockProductData(t, session, ctx)
		p, err := session.Product.Query().All(ctx)
		if err != nil {
			t.Fatal(err)
		}
		t.Log(p)
	})

}
