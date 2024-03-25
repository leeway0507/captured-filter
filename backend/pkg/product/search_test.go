package product

import (
	"backend/lib/testutil"
	"context"
	"testing"
)

func Test_Search(t *testing.T) {
	session := testutil.MockDB(t)
	defer testutil.FinishAll(t, session)

	ctx := context.Background()
	testutil.LoadStoreDataForForeignKey(t, session, ctx)
	testutil.LoadMockProductData(t, session, ctx)

	t.Run("test_search query", func(t *testing.T) {
		v := "ig1376"
		r, err := SearchProduct(ctx, session, v)
		if err != nil {
			t.Fatal(err)
		}
		got := (*r)[0].ProductID
		if got != v {
			t.Fatalf("fail to search query got : %s, want : %s", got, v)
		}
	})
}
