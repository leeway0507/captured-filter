package product

import (
	"backend/ent"
	"context"
	"database/sql"
)

func SearchProduct(ctx context.Context, session *ent.Client, q string) (sql.Result, error) {
	query := `SELECT * FROM products WHERE 
			  MATCH(product_name) AGAINST(? IN BOOLEAN MODE)`
	r, err := session.ExecContext(ctx, query, q)
	if err != nil {
		return nil, err
	}
	return r, nil
}
