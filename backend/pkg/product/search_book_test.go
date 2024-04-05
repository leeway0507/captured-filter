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

	t.Run("test cahce bug", func(t *testing.T) {
		v1 := "ig1376"
		v2 := "ie7002"
		v3 := "ie3438"

		res := ps.FindSearchResult(ctx, v1, 1)
		if res.Data[0].ProductID != v1 {
			t.Fatal(res.Err)
		}
		res2 := ps.FindSearchResult(ctx, v2, 1)
		if res2.Data[0].ProductID != v2 {
			t.Fatal(res.Err)
		}
		res3 := ps.FindSearchResult(ctx, v1, 1)
		if res3.Data[0].ProductID != v1 {
			t.Fatal(res.Err)
		}
		res4 := ps.FindSearchResult(ctx, v1, 1)
		if res4.Data[0].ProductID != v1 {
			t.Fatal(res.Err)
		}
		res5 := ps.FindSearchResult(ctx, v1, 1)
		if res5.Data[0].ProductID != v1 {
			t.Fatal(res.Err)
		}
		res6 := ps.FindSearchResult(ctx, v2, 1)
		if res6.Data[0].ProductID != v2 {
			t.Fatal(res.Err)
		}

		res7 := ps.FindSearchResult(ctx, v3, 1)
		if res7.Data[0].ProductID != v3 {
			t.Fatal(res.Err)
		}
		res8 := ps.FindSearchResult(ctx, v3, 1)
		if res8.Data[0].ProductID != v3 {
			t.Fatal(res.Err)
		}
	})
}
