package product

import (
	"backend/lib/testutil"
	"context"
	"log"
	"testing"
)

func TestFilter(t *testing.T) {
	session := testutil.MockDB(t)
	pf := NewProductFilterPageBook()
	pf.Session = session

	defer session.Close()

	ctx := context.Background()
	testutil.LoadStoreDataForForeignKey(t, session, ctx)
	testutil.LoadMockProductData(t, session, ctx)

	t.Run("Test_Check_Whether_Limit_Value_set", func(t *testing.T) {
		p := ProductPage{Page: 1, Filter: ProductFilterReq{}}
		pf.LimitPerPage = 10
		res := pf.Filter(ctx, p.Filter, p.Page)
		if res.Err != nil {
			t.Fatal(res.Err)
		}

	})

	t.Run("Test_filterQuery_1", func(t *testing.T) {
		f := ProductFilterReq{
			StoreName: &[]string{"test_store_first", "test_store_second"},
			Brand:     &[]string{"adidas_second"},
		}
		p, err := pf.FilterQuery(ctx, f)
		if err != nil {
			log.Fatal(err)
		}
		if len(p) != 10 {
			log.Fatal("Test_filterQuery_1 Error")
		}

	})
	t.Run("Test_filterQuery_2", func(t *testing.T) {
		f := ProductFilterReq{
			StoreName: &[]string{"test_store_second"},
			Brand:     &[]string{"adidas_second"},
		}
		p, err := pf.FilterQuery(ctx, f)
		if err != nil {
			log.Fatal(err)
		}
		if len(p) != 10 {
			log.Fatalf("Test_filterQuery_2 Error : %s", p)
		}

	})

}
