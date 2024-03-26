package product

import (
	"backend/lib/testutil"
	"context"
	"testing"
)

func Test_Search(t *testing.T) {
	session := testutil.MockDB(t)
	defer testutil.FinishAll(t, session)

	ps := NewProductSearchtBook()
	ps.Session = session
	ps.LimitPerPage = 100

	ctx := context.Background()

	testutil.LoadStoreDataForForeignKey(t, session, ctx)
	testutil.LoadMockProductData(t, session, ctx)

	t.Run("test search query", func(t *testing.T) {
		v := "ig1376"
		r, err := ps.SearchData(ctx, v)
		if err != nil {
			t.Fatal(err)
		}
		got := (*r)[0].ProductID
		if got != v {
			t.Fatalf("fail to search query got : %s, want : %s", got, v)
		}
	})
	t.Run("test search query cache", func(t *testing.T) {
		v := "ig1376"
		res := ps.FindSearchResult(ctx, v, 1)
		if res.Err != nil {
			t.Fatal(res.Err)
		}

		if res.Data[0].ProductID != v {
			t.Fatal("search Query failed")
		}

		res2 := ps.FindSearchResult(ctx, v, 1)
		if !res2.FromCahce {
			t.Fatal("search cache does not work ")
		}
	})
}
