package product

import (
	"backend/ent"
	"backend/ent/product"
	"context"
	"time"

	"github.com/hashicorp/golang-lru/v2/expirable"
)

type ProductFilterMeta struct {
	StoreName []*ent.Store `json:"storeName"`
	Brand     *[]string    `json:"brand"`
}

var (
	cache = expirable.NewLRU[string, *ProductFilterMeta](1, nil, 100*time.Hour)
)

func GetFilterMeta(session *ent.Client) (*ProductFilterMeta, error) {
	cachedFilter, ok := cache.Get("filter")
	// fmt.Printf("cachedFIlter %v", cachedFilter)

	if ok {
		return cachedFilter, nil
	}

	ctx := context.Background()
	newFilter, err := CreateProductMetaValues(ctx, session)

	if err != nil {
		return nil, err
	}

	cache.Add("filter", newFilter)
	// fmt.Printf("newFilter %v", newFilter)
	return newFilter, nil
}

func CreateProductMetaValues(ctx context.Context, session *ent.Client) (*ProductFilterMeta, error) {
	brand, err := ExtractDistinctValues(ctx, session, product.FieldBrand)
	if err != nil {
		return nil, err
	}
	storeName, err := ExtractStoreValues(ctx, session)
	if err != nil {
		return nil, err
	}
	return &ProductFilterMeta{
		Brand:     &brand,
		StoreName: storeName,
	}, nil
}

func ExtractDistinctValues(ctx context.Context, session *ent.Client, columnName string) ([]string, error) {
	return session.Product.Query().Unique(true).Select(columnName).Strings(ctx)
}

func ExtractStoreValues(ctx context.Context, session *ent.Client) ([]*ent.Store, error) {
	return session.Product.Query().Select(product.FieldStoreName).QueryStore().All(ctx)
}
