package product

import (
	"backend/lib/db"
	"context"
	"database/sql"
)

const searchQuery = `SELECT * FROM products WHERE 
			  MATCH(product_name) AGAINST(? IN BOOLEAN MODE)`

func SearchProduct(ctx context.Context, session *sql.DB, q string) (*[]db.Product, error) {
	rows, err := session.QueryContext(ctx, searchQuery, q)

	if err != nil {
		return nil, err
	}

	return db.ExtractProductsFromRows(rows)
}
