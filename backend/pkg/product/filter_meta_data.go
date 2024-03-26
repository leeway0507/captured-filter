package product

import (
	"backend/lib/db"
	"backend/pkg/store"
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"

	"github.com/hashicorp/golang-lru/v2/expirable"
)

type ProductFilterMeta struct {
	StoreInfo *[]db.Store `json:"StoreInfo"`
	Brand     *[]string   `json:"brand"`
}

var (
	cache = expirable.NewLRU[string, *ProductFilterMeta](1, nil, 100*time.Hour)
)

func GetFilterMeta(session *sql.DB) (*ProductFilterMeta, error) {
	cachedFilter, ok := cache.Get("filter")

	if ok {
		return cachedFilter, nil
	}

	ctx := context.Background()
	newFilter, err := CreateProductMetaValues(ctx, session)

	if err != nil {
		return nil, err
	}

	cache.Add("filter", newFilter)
	return newFilter, nil
}

func CreateProductMetaValues(ctx context.Context, session *sql.DB) (*ProductFilterMeta, error) {
	brand, err := ExtractDistinctValues(ctx, session, "brand")
	if err != nil {
		return nil, err
	}
	StoreInfo, err := ExtractStoreInfo(ctx, session)
	if err != nil {
		return nil, err
	}
	return &ProductFilterMeta{
		Brand:     &brand,
		StoreInfo: StoreInfo,
	}, nil
}

func ExtractDistinctValues(ctx context.Context, session *sql.DB, columnName string) ([]string, error) {
	quotedColumns := map[string]string{
		"store_name": "store_name",
		"brand":      "brand",
	}

	quoted, ok := quotedColumns[columnName]
	if !ok {
		return nil, errors.New("No column name in quotedColumns")
	}
	getDistinctiveValuesStmt := fmt.Sprintf("SELECT DISTINCT %s FROM products;", quoted)
	rows, err := session.QueryContext(ctx, getDistinctiveValuesStmt)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var results []string
	for rows.Next() {
		var r string
		if err := rows.Scan(&r); err != nil {
			return nil, err
		}
		results = append(results, r)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return results, nil
}
func ExtractStoreInfo(ctx context.Context, session *sql.DB) (*[]db.Store, error) {
	return store.GetStores(ctx, session)
}
