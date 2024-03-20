package product

import (
	"backend/ent"
	"backend/ent/product"
	"backend/pkg/entities"
	"context"
	"log"
	"time"

	"github.com/hashicorp/golang-lru/v2/expirable"
)

func NewProductFilterPageBook() *ProductFilterPageBook {
	impl := &ProductFilterPageBook{}

	cache := expirable.NewLRU[ProductFilterReq, entities.PageBook[*ent.Product]](10, nil, 100*time.Second)
	impl.Cache = cache
	return impl
}

type ProductFilterPageBook struct {
	entities.FilterPageBook[ProductFilterReq, *ent.Product]
}

func (pf *ProductFilterPageBook) Filter(
	ctx context.Context,
	filter ProductFilterReq,
	page int,
) *entities.FilterResponse[*ent.Product] {
	return pf.FilterTemplate(ctx, filter, page, pf.FilterQuery)
}

func (pf *ProductFilterPageBook) FilterQuery(ctx context.Context, filter ProductFilterReq) (entities.Page[*ent.Product], error) {
	// Default
	q := pf.Session.Product.
		Query().
		Where(product.SoldOutEQ(false))

	// StoreName
	if filter.StoreName != nil && len(*filter.StoreName) > 0 {
		q = q.Where(product.StoreNameIn(*filter.StoreName...))
	}
	// brandName
	if filter.Brand != nil && len(*filter.Brand) > 0 {
		q = q.Where(product.BrandIn(*filter.Brand...))
	}

	if filter.Sale {
		q = q.Where(product.IsSale(true))
	}

	// Execute
	products, err := q.All(ctx)

	if err != nil {
		log.Fatalf("failed to query products: %v", err)
	}

	return products, err

}
