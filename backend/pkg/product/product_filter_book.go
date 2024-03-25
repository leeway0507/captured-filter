package product

import (
	"backend/lib/db"
	"backend/pkg/entities"
	"context"
	"strings"
	"time"

	"github.com/hashicorp/golang-lru/v2/expirable"
)

type ProductPage struct {
	Page   int                      `json:"page"`
	Filter ProductFilterBookRequest `json:"filter"`
}
type ProductFilterBookRequest struct {
	StoreName *[]string `json:"storeInfo"`
	Brand     *[]string `json:"productInfo_product_id"`
	Sale      bool      `json:"sale"`
}

func NewProductBook() *ProductFilterBook {
	impl := &ProductFilterBook{}

	cache := expirable.NewLRU[ProductFilterBookRequest, entities.Book[*db.Product]](10, nil, 100*time.Second)
	impl.Cache = cache
	return impl
}

type ProductFilterBook struct {
	entities.FilterBook[ProductFilterBookRequest, *db.Product]
}

func (pf *ProductFilterBook) ExecFilter(
	ctx context.Context,
	filter ProductFilterBookRequest,
	page int,
) *entities.FilterBookResponse[*db.Product] {
	return pf.FilterTemplate(ctx, filter, page, pf.FilterQuery)
}

func (pf *ProductFilterBook) FilterQuery(
	ctx context.Context, filter ProductFilterBookRequest,
) (entities.Page[*db.Product], error) {
	query, values := pf.FilterStmt(ctx, filter)

	rows, err := pf.Session.QueryContext(ctx, query, values...)
	if err != nil {
		return nil, err
	}
	r, err := db.ExtractProductsFromRows(rows)
	if err != nil {
		return nil, err
	}

	var result entities.Page[*db.Product]
	for _, x := range *r {
		result = append(result, &x)
	}
	return result, err

}

const filerBaseStmt = `SELECT 
	id,brand,
	product_name,product_img_url,
	product_url,currency_code,
	retail_price,sale_price,
	kor_brand,kor_product_name,
	product_id,gender,
	color,category,
	category_spec,store_name,
	made_in,is_sale,
	sold_out, updated_at
 	FROM products
	WHERE sold_out = false
 `

func (pf *ProductFilterBook) FilterStmt(ctx context.Context, filter ProductFilterBookRequest) (string, []interface{}) {
	var filterValues []interface{}
	var whereClauses []string

	// Handle the IN operator for part_ids
	if filter.StoreName != nil {
		storeName := *filter.StoreName
		placeholders := make([]string, len(storeName))
		for i, name := range storeName {
			placeholders[i] = "?"
			filterValues = append(filterValues, name)
		}
		whereClauses = append(whereClauses, "store_name IN ("+strings.Join(placeholders, ",")+")")
	}
	if filter.Brand != nil {
		brand := *filter.Brand
		placeholders := make([]string, len(brand))
		for i, name := range brand {
			placeholders[i] = "?"
			filterValues = append(filterValues, name)

		}
		whereClauses = append(whereClauses, "brand IN ("+strings.Join(placeholders, ",")+")")
	}

	// Add other filters as before
	if filter.Sale {
		whereClauses = append(whereClauses, "is_sale = true")
	}

	// Combine the WHERE clauses with AND
	whereClause := strings.Join(whereClauses, " AND ")

	// Build the final query
	query := filerBaseStmt + ` AND ` + whereClause

	return query, filterValues
}
