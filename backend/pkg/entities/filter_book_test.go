package entities

import (
	"backend/lib/db"
	"backend/lib/testutil"
	"context"
	"math"
	"testing"
	"time"

	"github.com/hashicorp/golang-lru/v2/expirable"
)

var (
	pageLimit = 10
	pf        = &FilterBook[string, *db.Product]{LimitPerPage: pageLimit}
)

func Test_Filter(t *testing.T) {
	session := testutil.MockDB(t)
	defer testutil.FinishAll(t, session)
	cache := expirable.NewLRU[string, Book[*db.Product]](10, nil, 100*time.Second)

	pf.Session = session
	pf.Cache = cache

	ctx := context.Background()

	testutil.LoadStoreDataForForeignKey(t, session, ctx)
	testutil.LoadMockProductData(t, session, ctx)

	t.Run("Test_SplitData", func(t *testing.T) {
		d, err := testutil.GetProductsQuery(ctx, session)
		if err != nil {
			t.Fatal(err)
		}
		var p Page[*db.Product]
		for _, v := range *d {
			p = append(p, &v)
		}

		res, err := pf.SplitData(p)
		if err != nil {
			t.Fatal(err)
		}
		got := 0
		for range res {
			got++
		}
		f := float64(len(*d)) / float64(pf.LimitPerPage)
		want := int(math.Ceil(f))
		if got != (want) {
			t.Fatalf("\n got : %v want :%v \n ", got, want)
		}
	})
	t.Run("Test_Filter", func(t *testing.T) {
		filter := "x"
		d, err := testutil.GetProductsQuery(ctx, session)
		if err != nil {
			t.Fatal(err)
		}
		var p Page[*db.Product]
		for _, v := range *d {
			p = append(p, &v)
		}

		res, err := pf.SplitData(p)
		if err != nil {
			t.Fatal(err)
		}
		pf.Cache.Add(filter, res)
		v := pf.FilterTemplate(ctx, filter, 1, pf.FilterQuery)
		if len(v.Data) != pf.LimitPerPage {
			t.Fatalf("Test_Filter Error : length of response data should be same as limit")
		}
	})

}
