package product

import (
	"backend/ent/product"
	"backend/lib/testutil"
	"context"
	"testing"
)

func TestFilterMeta(t *testing.T) {
	session := testutil.MockDB(t)
	defer session.Close()

	ctx := context.Background()
	testutil.LoadStoreDataForForeignKey(t, session, ctx)
	testutil.LoadMockProductData(t, session, ctx)

	t.Run("Test_extracting_distinct_values", func(t *testing.T) {
		got, err := ExtractDistinctValues(ctx, session, product.FieldStoreName)
		if err != nil {
			t.Error(err)
		}
		want := []string{"test_store_first", "test_store_second", "test_store_third", "test_store"}
		testutil.Equal(t, got, want)
	})
	t.Run("Test_store_field_data", func(t *testing.T) {
		StoreName, err := ExtractStoreValues(ctx, session)
		if err != nil {
			t.Error(err)
		}
		want := []string{"test_store_first", "test_store_second", "test_store_third", "test_store"}
		var got []string
		for _, v := range StoreName {
			got = append(got, v.ID)
		}
		testutil.Equal(t, got, want)
	})
	t.Run("Test_create_meta_values", func(t *testing.T) {
		got, err := CreateProductMetaValues(ctx, session)
		if err != nil {
			t.Error(err)
		}
		testFilter(t, got)
	})
	t.Run("Test_get_filter_cache", func(t *testing.T) {
		got, err := GetFilterMeta(session)
		if err != nil {
			t.Error(err)
		}
		testFilter(t, got)

		got2, err := GetFilterMeta(session)
		if err != nil {
			t.Error(err)
		}
		testFilter(t, got2)

	})
}

func testFilter(t *testing.T, got *ProductFilterMeta) {
	brandNameWant := []string{"adidas_first", "adidas_second", "adidas_third", "adidas"}
	storeNameWant := []string{"test_store_first", "test_store_second", "test_store_third", "test_store"}
	var storeNameGot []string
	for _, v := range got.StoreName {
		storeNameGot = append(storeNameGot, v.ID)
	}
	testutil.Equal(t, *got.Brand, brandNameWant)
	testutil.Equal(t, storeNameGot, storeNameWant)
}
